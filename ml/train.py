import argparse
import json
from pathlib import Path
from typing import Any, Dict, List, Tuple

import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split


FEATURE_COLUMNS = [
    "powerScore",
    "troopDensity",
    "heroBuffTotal",
    "synergyScore",
    "leaderStrength",
    "joinerStrength",
    "rallyCapacity",
    "deploymentEfficiency",
]


class RuleFallbackModel:
    def __init__(self, threshold: float = 0.55):
        self.threshold = threshold

    def predict_proba(self, x: List[List[float]]) -> List[List[float]]:
        out = []
        for row in x:
            base = sum(row) / max(len(row), 1)
            p = max(0.01, min(0.99, base))
            out.append([1 - p, p])
        return out


def load_dataset(dataset_path: Path) -> List[Dict[str, Any]]:
    with dataset_path.open("r", encoding="utf-8") as f:
        data = json.load(f)
    if isinstance(data, list):
        return [x for x in data if isinstance(x, dict)]
    return []


def to_xy(records: List[Dict[str, Any]]) -> Tuple[List[List[float]], List[int]]:
    x: List[List[float]] = []
    y: List[int] = []

    for record in records:
        row = [float(record.get(col, 0.0)) for col in FEATURE_COLUMNS]
        result = record.get("result")
        if result is None:
            continue
        label = int(result)
        x.append(row)
        y.append(label)

    return x, y


def feature_importance_dict(model: Any) -> Dict[str, float]:
    if hasattr(model, "feature_importances_"):
        vals = list(model.feature_importances_)
        return {name: float(vals[idx]) for idx, name in enumerate(FEATURE_COLUMNS)}
    return {name: 0.0 for name in FEATURE_COLUMNS}


def train_model(x: List[List[float]], y: List[int], use_logistic: bool) -> Tuple[Any, float, Dict[str, float], bool]:
    enough_data = len(x) >= 20 and len(set(y)) >= 2

    if not enough_data:
        fallback = RuleFallbackModel()
        probs = fallback.predict_proba(x)
        preds = [1 if p[1] >= 0.5 else 0 for p in probs]
        acc = accuracy_score(y, preds) if y else 0.0
        return fallback, float(acc), {name: 0.0 for name in FEATURE_COLUMNS}, True

    x_train, x_test, y_train, y_test = train_test_split(
        x,
        y,
        test_size=0.25,
        random_state=42,
        stratify=y,
    )

    if use_logistic:
        model = LogisticRegression(max_iter=1000)
    else:
        model = RandomForestClassifier(n_estimators=200, random_state=42)

    model.fit(x_train, y_train)
    preds = model.predict(x_test)
    acc = float(accuracy_score(y_test, preds))
    return model, acc, feature_importance_dict(model), False


def main() -> None:
    parser = argparse.ArgumentParser(description="Train ML model for Kingshot hybrid AI")
    parser.add_argument("--dataset", default="ml/dataset.json", help="Dataset JSON path")
    parser.add_argument("--model", default="ml/model.pkl", help="Output model file")
    parser.add_argument("--logistic", action="store_true", help="Use LogisticRegression instead of RandomForest")
    args = parser.parse_args()

    dataset_path = Path(args.dataset)
    model_path = Path(args.model)

    records = load_dataset(dataset_path)
    x, y = to_xy(records)

    if not x:
        raise RuntimeError("Dataset has no usable rows. Run ml/features.py first.")

    model, accuracy, importance, used_fallback = train_model(x, y, args.logistic)

    model_path.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(model, model_path)

    output = {
        "accuracy": accuracy,
        "feature_importance": importance,
        "model_file": str(model_path),
        "fallback_used": used_fallback,
    }

    metrics_path = model_path.parent / "model-metrics.json"
    with metrics_path.open("w", encoding="utf-8") as f:
        json.dump(output, f, indent=2)

    print(json.dumps(output, indent=2))


if __name__ == "__main__":
    main()
