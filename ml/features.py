import argparse
import json
from pathlib import Path
from typing import Any, Dict, List


def parse_scaled_number(value: Any) -> float:
    if value is None:
        return 0.0
    if isinstance(value, (int, float)):
        return float(value)
    if not isinstance(value, str):
        return 0.0

    text = value.strip().replace(",", "").upper()
    if not text:
        return 0.0

    multiplier = 1.0
    if text.endswith("K"):
        multiplier = 1_000.0
        text = text[:-1]
    elif text.endswith("M"):
        multiplier = 1_000_000.0
        text = text[:-1]

    try:
        return float(text) * multiplier
    except ValueError:
        return 0.0


def min_max_normalize(rows: List[Dict[str, Any]], fields: List[str]) -> None:
    for field in fields:
        values = [float(row.get(field, 0.0)) for row in rows]
        if not values:
            continue
        min_v, max_v = min(values), max(values)
        if max_v == min_v:
            for row in rows:
                row[field] = 0.0
            continue
        for row in rows:
            row[field] = (float(row.get(field, 0.0)) - min_v) / (max_v - min_v)


def infer_result(record: Dict[str, Any]) -> int:
    status = str(record.get("status", "")).lower()
    if status == "approved":
        return 1
    if status == "rejected":
        return 0
    return 0


def build_feature_row(record: Dict[str, Any]) -> Dict[str, Any]:
    town_center = float(record.get("townCenter") or 0)
    rally_capacity = parse_scaled_number(record.get("rallyCap"))
    deployment = parse_scaled_number(record.get("deploymentCap"))
    troops = parse_scaled_number(record.get("totalTroops"))

    power_score = town_center * 1000 + rally_capacity
    troop_density = troops / max(rally_capacity, 1.0)

    group = str(record.get("group", "")).lower()
    leader_strength = 1.0 if "rally host" in group else 0.0
    joiner_strength = deployment / max(rally_capacity, 1.0)

    synergy_score = 0.4
    if "r3" in group:
        synergy_score = 0.7
    elif "r2" in group:
        synergy_score = 0.55
    elif "r1" in group:
        synergy_score = 0.35
    elif "rally host" in group:
        synergy_score = 0.9

    hero_buff_total = (town_center / 30.0) * 0.6 + joiner_strength * 0.4
    deployment_efficiency = deployment / max(troops, 1.0)

    return {
        "powerScore": power_score,
        "troopDensity": troop_density,
        "heroBuffTotal": hero_buff_total,
        "synergyScore": synergy_score,
        "leaderStrength": leader_strength,
        "joinerStrength": joiner_strength,
        "rallyCapacity": rally_capacity,
        "deploymentEfficiency": deployment_efficiency,
        "result": infer_result(record),
    }


def load_records(input_path: Path) -> List[Dict[str, Any]]:
    with input_path.open("r", encoding="utf-8") as f:
        data = json.load(f)

    if isinstance(data, list):
        return [x for x in data if isinstance(x, dict)]
    return []


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate ML-ready features from roster data")
    parser.add_argument("--input", default="data/submissions/mock.json", help="Input JSON records")
    parser.add_argument("--output", default="ml/dataset.json", help="Output dataset path")
    args = parser.parse_args()

    input_path = Path(args.input)
    output_path = Path(args.output)

    records = load_records(input_path)
    rows = [build_feature_row(record) for record in records]

    numeric_fields = [
        "powerScore",
        "troopDensity",
        "heroBuffTotal",
        "synergyScore",
        "leaderStrength",
        "joinerStrength",
        "rallyCapacity",
        "deploymentEfficiency",
    ]

    min_max_normalize(rows, numeric_fields)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    with output_path.open("w", encoding="utf-8") as f:
        json.dump(rows, f, indent=2)

    print(f"Generated {len(rows)} feature rows into {output_path}")


if __name__ == "__main__":
    main()
