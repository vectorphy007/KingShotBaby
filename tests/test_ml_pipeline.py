import json
from pathlib import Path
import subprocess


ROOT = Path(__file__).resolve().parents[1]


def test_training_pipeline_outputs_model_and_metrics():
    dataset = ROOT / "ml" / "dataset.json"
    model_file = ROOT / "ml" / "model.pkl"
    metrics_file = ROOT / "ml" / "model-metrics.json"

    proc = subprocess.run(
        ["python", "ml/train.py", "--dataset", str(dataset), "--model", str(model_file)],
        cwd=ROOT,
        capture_output=True,
        text=True,
        check=False,
    )

    assert proc.returncode == 0, proc.stderr
    assert model_file.exists(), "model.pkl was not produced"
    assert metrics_file.exists(), "model-metrics.json was not produced"

    with metrics_file.open("r", encoding="utf-8") as f:
        metrics = json.load(f)

    assert "accuracy" in metrics
    assert "model_file" in metrics
