# Design Log

Date: 2026-04-30

Modules Added:
- Hero Intelligence Layer
- ML Training Pipeline

Changes:
- Added hero feature extraction and scoring module in /lib/ai/hero.ts.
- Added bear-team recommender with synergy-aware leader and joiner selection in /lib/ai/recommender.ts.
- Added hybrid rule+ML score blending with confidence fallback in /lib/ai/model.ts.
- Added AI API endpoints for optimize and predict responses in /app/api/ai/optimize/route.ts and /app/api/ai/predict/route.ts.
- Added ML feature engineering and training scripts in /ml/features.py and /ml/train.py.
- Added ML dataset bootstrap file at /ml/dataset.json.
- Added Jest and Pytest tests for AI logic, API routes, ML pipeline, and calculator regression.

Impact:
- Smarter decision-making from hero-aware recommendations and synergy scoring.
- Predictive capability via optional ML confidence-weighted scoring.
- Stability preserved by keeping calculator modules unchanged and adding regression tests.

Risk:
- Medium (ML integration)
