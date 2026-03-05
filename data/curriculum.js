/* ============================================================
   DS & AI Engineer Pathway — data/curriculum.js
   All phases, cards, topics and resources live here.
   Edit this file to add/remove topics or update resources.
   ============================================================ */

const CURRICULUM = [
  {
    id: 0,
    phase: "Python Quick Reference",
    weeks: "Already Known ✓",
    color: "var(--emerald)",
    cards: [
      {
        emoji: "🐍",
        title: "Python Fundamentals",
        subtitle: "Core language features — variables, control flow, functions, OOP",
        tag: "Refresh",
        desc: "You already know Python, so this is a quick-glance reference. Focus on the areas most relevant to data science: writing clean, idiomatic Python with list/dict comprehensions, proper use of *args/**kwargs, and knowing when to use generators vs lists for memory efficiency.",
        topics: [
          "Data types (int, float, str, bool, None)",
          "Lists, Tuples, Dicts, Sets",
          "List & dict comprehensions",
          "Control flow (if/elif/else, for, while)",
          "Functions, *args, **kwargs",
          "Lambda functions",
          "Default & keyword arguments",
          "Unpacking (*, **)",
          "f-strings & string formatting",
          "Exception handling (try/except/finally)",
          "Context managers (with statement)",
          "Global vs local scope"
        ],
        resources: [
          { icon: "📖", name: "Python Official Docs — Tutorial", type: "Documentation", url: "https://docs.python.org/3/tutorial/" },
          { icon: "🎥", name: "Corey Schafer — Python Beginner Series", type: "YouTube Series", url: "https://www.youtube.com/playlist?list=PL-osiE80TeTskrapNbzXhwoFUiLCjGgY7" },
          { icon: "🧑‍💻", name: "Exercism — Python Track", type: "Practice Problems", url: "https://exercism.org/tracks/python" },
          { icon: "🧑‍💻", name: "Python Cheatsheet (comprehensive)", type: "Reference", url: "https://www.pythoncheatsheet.org/" },
        ]
      },
      {
        emoji: "🏗️",
        title: "Python for Data Science",
        subtitle: "OOP, file I/O, modules, virtual envs — the engineering side of Python",
        tag: "Refresh",
        desc: "Data science Python isn't just scripts — it's knowing how to structure projects properly, manage dependencies, write reusable classes, and debug efficiently. These habits separate someone who can run a notebook from someone who can build a production system.",
        topics: [
          "Classes & OOP (inheritance, dunder methods)",
          "Decorators (@staticmethod, @classmethod, custom)",
          "Generators & iterators",
          "File I/O (reading CSVs, JSON, text)",
          "os & pathlib for file paths",
          "Virtual environments (venv, conda)",
          "pip & requirements.txt",
          "Modules & packages structure",
          "Type hints (type annotations)",
          "Debugging with pdb / ipdb",
          "Profiling with cProfile & line_profiler",
          "Logging (logging module)",
          "Writing tests with pytest"
        ],
        resources: [
          { icon: "📖", name: "Real Python — Python Intermediate Topics", type: "Articles & Tutorials", url: "https://realpython.com/" },
          { icon: "🎥", name: "Corey Schafer — OOP in Python", type: "YouTube Series", url: "https://www.youtube.com/playlist?list=PL-osiE80TeTsqhIuOqKhwlXsIBIdSeYtc" },
          { icon: "🧑‍💻", name: "Python Packaging User Guide", type: "Documentation", url: "https://packaging.python.org/en/latest/tutorials/packaging-projects/" },
          { icon: "📖", name: "Fluent Python — Ramalho (advanced)", type: "Book", url: "https://www.oreilly.com/library/view/fluent-python-2nd/9781492056348/" },
        ]
      },
      {
        emoji: "⚡",
        title: "Performance & Scientific Python",
        subtitle: "NumPy thinking, Jupyter, profiling — write Python that actually runs fast",
        tag: "Refresh",
        desc: "Writing Python for data science has different performance patterns than web dev. The key insight: Python loops over large data are slow — think in arrays instead. Understanding Jupyter workflows, vectorization philosophy, and basic profiling will save you hours every week.",
        topics: [
          "Jupyter notebooks & JupyterLab",
          "IPython magic commands (%timeit, %prun)",
          "Vectorized thinking (avoid for-loops on arrays)",
          "NumPy array creation & manipulation",
          "Broadcasting rules",
          "Fancy indexing & masking",
          "scipy for scientific computing",
          "Joblib for parallelism",
          "Multiprocessing vs threading",
          "Memory profiling",
          "Writing efficient Python (slots, caching)",
          "Using __slots__ for memory optimization"
        ],
        resources: [
          { icon: "🧑‍💻", name: "Jupyter Notebook Official Docs", type: "Documentation", url: "https://jupyter-notebook.readthedocs.io/" },
          { icon: "📖", name: "NumPy — Absolute Beginners Guide", type: "Documentation", url: "https://numpy.org/doc/stable/user/absolute_beginners.html" },
          { icon: "🎥", name: "ArjanCodes — Python Performance Tips", type: "YouTube", url: "https://www.youtube.com/@ArjanCodes" },
          { icon: "🧑‍💻", name: "High Performance Python (book)", type: "Book", url: "https://www.oreilly.com/library/view/high-performance-python/9781492055013/" },
        ]
      }
    ]
  },
  {
    id: 1,
    phase: "Math & Data Foundations",
    weeks: "Weeks 1–3",
    color: "var(--cyan)",
    cards: [
      {
        emoji: "➗",
        title: "Math for ML",
        subtitle: "Linear algebra, calculus & probability — the language models are written in",
        tag: "Essential",
        desc: "You can use ML without this, but you can't truly understand it. Linear algebra explains why neural networks work. Calculus explains how they learn. Statistics tells you whether they're actually good. You don't need to prove theorems — you need intuition and the ability to read a gradient.",
        topics: [
          "Vectors & Matrices", "Dot products", "Matrix multiplication", "Eigenvalues (basics)",
          "Partial derivatives", "Chain rule", "Gradient Descent intuition",
          "Probability distributions", "Bayes theorem", "Hypothesis testing",
          "p-values", "Confidence intervals", "Expected value & variance"
        ],
        resources: [
          { icon: "🎥", name: "3Blue1Brown: Essence of Linear Algebra", type: "YouTube Series", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab" },
          { icon: "🎥", name: "StatQuest with Josh Starmer", type: "YouTube Channel", url: "https://www.youtube.com/@statquest" },
          { icon: "📖", name: "Mathematics for Machine Learning (free PDF)", type: "Textbook", url: "https://mml-book.github.io/" },
          { icon: "🧑‍💻", name: "Khan Academy — Calculus & Statistics", type: "Free Course", url: "https://www.khanacademy.org" },
        ]
      },
      {
        emoji: "🗄️",
        title: "SQL & Data Querying",
        subtitle: "Every real-world dataset lives in a database — learn to extract it",
        tag: "Essential",
        desc: "Data science starts before the model. You need to pull, filter, join and aggregate data efficiently. SQL is used daily in virtually every data role. Window functions especially are underrated and extremely powerful for building features directly in SQL before data ever hits Python.",
        topics: [
          "SELECT, WHERE, GROUP BY", "JOINs (inner, left, full outer)", "Subqueries & CTEs",
          "Window Functions (LAG, RANK, NTILE)", "Aggregations & HAVING", "CASE statements",
          "Indexing & query performance", "PostgreSQL basics", "SQLite for prototyping", "Writing analytical queries"
        ],
        resources: [
          { icon: "🧑‍💻", name: "SQLZoo — Interactive SQL", type: "Free Practice", url: "https://sqlzoo.net" },
          { icon: "📖", name: "Mode SQL Tutorial", type: "Free Tutorial", url: "https://mode.com/sql-tutorial/" },
          { icon: "🧑‍💻", name: "LeetCode SQL 50", type: "Practice Problems", url: "https://leetcode.com/studyplan/top-sql-50/" },
          { icon: "🎥", name: "Alex the Analyst — SQL Full Course", type: "YouTube Series", url: "https://www.youtube.com/@AlexTheAnalyst" },
        ]
      }
    ]
  },
  {
    id: 2,
    phase: "Data Wrangling & EDA",
    weeks: "Weeks 4–6",
    color: "var(--violet)",
    cards: [
      {
        emoji: "🐼",
        title: "NumPy & Pandas (Advanced)",
        subtitle: "You know Python — now master the core data toolkit inside out",
        tag: "Core",
        desc: "As a Python developer you'll pick these up fast. The focus here is going beyond the basics: vectorized operations (avoid Python loops on DataFrames!), advanced multi-index, handling real-world messy data, memory optimization for large files, and chaining transformations elegantly.",
        topics: [
          "NumPy broadcasting & vectorized ops", "Advanced Pandas indexing (.loc, .iloc, .query)",
          "Merging & joining datasets", "Handling missing values strategically",
          "String operations (str accessor)", "DateTime handling & resampling",
          "GroupBy & transform vs agg", "Pivot tables & crosstabs",
          "Apply vs map vs vectorize", "Memory optimization (dtypes, chunking)", "Method chaining patterns"
        ],
        resources: [
          { icon: "📖", name: "Pandas Official Docs — User Guide", type: "Documentation", url: "https://pandas.pydata.org/docs/user_guide/" },
          { icon: "🧑‍💻", name: "Kaggle — Pandas Course (Free)", type: "Free Course", url: "https://www.kaggle.com/learn/pandas" },
          { icon: "📖", name: "Python for Data Analysis — Wes McKinney", type: "Book", url: "https://wesmckinney.com/book/" },
          { icon: "🎥", name: "Corey Schafer — Pandas Tutorial Series", type: "YouTube Series", url: "https://www.youtube.com/@coreyms" },
        ]
      },
      {
        emoji: "📊",
        title: "EDA & Visualization",
        subtitle: "Turn raw data into insight — before you even touch a model",
        tag: "Core",
        desc: "Exploratory Data Analysis is how you understand your data deeply before modeling. Great visualizations reveal distributions, anomalies, correlations and outliers that guide every modeling decision. This is also the skill that makes you invaluable in cross-functional product meetings.",
        topics: [
          "Matplotlib fundamentals", "Seaborn statistical plots", "Plotly interactive charts",
          "Distribution analysis (histograms, KDE)", "Correlation matrices & heatmaps",
          "Outlier detection (IQR, z-score)", "Feature distributions by target",
          "Pair plots", "Missing value visualization", "Time series plots", "Storytelling with data"
        ],
        resources: [
          { icon: "📖", name: "Fundamentals of Data Visualization", type: "Free Online Book", url: "https://clauswilke.com/dataviz/" },
          { icon: "🧑‍💻", name: "Kaggle — Data Visualization Course", type: "Free Course", url: "https://www.kaggle.com/learn/data-visualization" },
          { icon: "🎥", name: "Python Seaborn & Plotly — Patrick Loeber", type: "YouTube", url: "https://www.youtube.com/@patloeber" },
          { icon: "🧑‍💻", name: "Plotly Docs — Python Chart Gallery", type: "Documentation", url: "https://plotly.com/python/" },
        ]
      }
    ]
  },
  {
    id: 3,
    phase: "Machine Learning",
    weeks: "Weeks 7–13",
    color: "var(--amber)",
    cards: [
      {
        emoji: "🎯",
        title: "Supervised Learning Algorithms",
        subtitle: "The workhorse of ML — understand how they work, not just how to call them",
        tag: "Core",
        desc: "Most ML problems in industry are supervised. Understand each algorithm conceptually — not just the sklearn API. Know why tree-based ensembles dominate tabular data, when linear models beat complex ones, and how to read feature importances to debug your models.",
        topics: [
          "Linear & Logistic Regression (math intuition)", "Decision Trees & pruning",
          "Random Forest & bagging", "Gradient Boosting (XGBoost, LightGBM, CatBoost)",
          "Support Vector Machines", "K-Nearest Neighbors", "Naive Bayes",
          "Bias-Variance tradeoff", "Regularization (L1/L2/ElasticNet)",
          "Feature importance & permutation importance", "SHAP values for explainability"
        ],
        resources: [
          { icon: "🎥", name: "StatQuest — ML Fundamentals Playlist", type: "YouTube Series", url: "https://www.youtube.com/@statquest" },
          { icon: "📖", name: "Hands-On Machine Learning (Géron) Ch.1–7", type: "Book", url: "https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/" },
          { icon: "🧑‍💻", name: "Kaggle — Intro to Machine Learning", type: "Free Course", url: "https://www.kaggle.com/learn/intro-to-machine-learning" },
          { icon: "📖", name: "Scikit-learn User Guide", type: "Documentation", url: "https://scikit-learn.org/stable/user_guide.html" },
        ]
      },
      {
        emoji: "🔬",
        title: "Model Evaluation & Tuning",
        subtitle: "Building a model is 20% of the work — making it reliable is 80%",
        tag: "Core",
        desc: "This is where juniors and seniors diverge. Understanding why your model underperforms, how to evaluate it correctly (accuracy is often misleading), and tuning it efficiently. Choosing the right metric for your business problem is a skill in itself.",
        topics: [
          "Train/Validation/Test split (no leakage!)", "K-Fold & Stratified Cross-Validation",
          "Accuracy, Precision, Recall, F1 score", "ROC-AUC vs PR-AUC (imbalanced data)",
          "Confusion matrix analysis", "Log loss & calibration", "RMSE / MAE / MAPE / R² for regression",
          "GridSearchCV & RandomizedSearchCV", "Optuna (Bayesian hyperparameter optimization)",
          "Diagnosing overfitting with learning curves", "Early stopping"
        ],
        resources: [
          { icon: "🎥", name: "StatQuest — ROC, AUC & Confusion Matrix", type: "YouTube", url: "https://www.youtube.com/@statquest" },
          { icon: "🧑‍💻", name: "Optuna Quickstart Documentation", type: "Documentation", url: "https://optuna.readthedocs.io/en/stable/tutorial/" },
          { icon: "🧑‍💻", name: "Kaggle — Intermediate ML (Pipelines & CV)", type: "Free Course", url: "https://www.kaggle.com/learn/intermediate-machine-learning" },
          { icon: "📖", name: "Scikit-learn Model Evaluation Guide", type: "Documentation", url: "https://scikit-learn.org/stable/modules/model_evaluation.html" },
        ]
      },
      {
        emoji: "⚙️",
        title: "Feature Engineering",
        subtitle: "Better features beat better models — the highest-leverage ML skill",
        tag: "Core",
        desc: "Most Kaggle grandmasters will tell you feature engineering won them more competitions than algorithm choice. Learn how to encode categoricals properly, create interaction features, handle class imbalance, and reduce noise. This is a creative, domain-specific craft.",
        topics: [
          "One-hot, ordinal & binary encoding", "Target encoding (with k-fold to avoid leakage)",
          "Scaling (StandardScaler, MinMax, RobustScaler)", "Handling imbalanced classes (SMOTE, class weights)",
          "PCA for dimensionality reduction", "t-SNE & UMAP for visualization",
          "Polynomial & interaction features", "Feature crosses", "Log & Box-Cox transforms",
          "SelectKBest & Recursive Feature Elimination", "Permutation importance for selection"
        ],
        resources: [
          { icon: "🧑‍💻", name: "Kaggle — Feature Engineering Course", type: "Free Course", url: "https://www.kaggle.com/learn/feature-engineering" },
          { icon: "📖", name: "Feature Engineering for Machine Learning", type: "Book", url: "https://www.oreilly.com/library/view/feature-engineering-for/9781491953235/" },
          { icon: "🎥", name: "Abhishek Thakur — Approaching ML Problems", type: "YouTube", url: "https://www.youtube.com/@AbhishekThakurAbhi" },
          { icon: "🧑‍💻", name: "imbalanced-learn Library Docs", type: "Library Docs", url: "https://imbalanced-learn.org/stable/" },
        ]
      }
    ]
  },
  {
    id: 4,
    phase: "Deep Learning & AI",
    weeks: "Weeks 14–20",
    color: "var(--emerald)",
    cards: [
      {
        emoji: "🧠",
        title: "Neural Networks & PyTorch",
        subtitle: "The foundation of all modern AI — learn how networks actually learn",
        tag: "Advanced",
        desc: "Don't just call .fit() — understand what's happening inside. Backpropagation, gradient descent, and the training loop are things you'll use every single day. PyTorch is the dominant framework in AI research and increasingly the default in production too.",
        topics: [
          "Perceptrons & multi-layer networks", "Activation functions (ReLU, GELU, sigmoid, softmax)",
          "Backpropagation & chain rule (mathematically)", "Optimizers (SGD, Adam, AdamW, RMSprop)",
          "Learning rate scheduling & warmup", "Batch Normalization & Layer Norm",
          "Dropout & weight decay", "PyTorch tensors, autograd & computation graphs",
          "Writing training loops from scratch", "Mixed precision training (float16)",
          "GPU training with CUDA", "Callbacks, checkpointing & early stopping"
        ],
        resources: [
          { icon: "🎥", name: "fast.ai — Practical Deep Learning (Free)", type: "Free Course", url: "https://course.fast.ai/" },
          { icon: "🧑‍💻", name: "PyTorch Official Tutorials", type: "Documentation", url: "https://pytorch.org/tutorials/" },
          { icon: "🎥", name: "Andrej Karpathy — Neural Nets: Zero to Hero", type: "YouTube Series", url: "https://www.youtube.com/@AndrejKarpathy" },
          { icon: "📖", name: "Deep Learning with PyTorch (free book)", type: "Free Book", url: "https://pytorch.org/assets/deep-learning/Deep-Learning-with-PyTorch.pdf" },
        ]
      },
      {
        emoji: "💬",
        title: "NLP & Transformers",
        subtitle: "The architecture behind GPT, Claude — now the default for text, vision, audio",
        tag: "Advanced",
        desc: "Transformers completely took over AI. Understanding attention, positional encodings, and the encoder-decoder architecture is mandatory for any AI engineering role. HuggingFace has made the ecosystem incredibly accessible — learn to navigate it confidently.",
        topics: [
          "Tokenization (BPE, WordPiece, SentencePiece)", "Word embeddings (Word2Vec, GloVe, FastText)",
          "Sequence models (RNN, LSTM — for context)", "Attention mechanism (query, key, value)",
          "Multi-head self-attention", "Positional encodings", "Full Transformer architecture",
          "BERT (encoder-only, masked LM)", "GPT (decoder-only, causal LM)", "T5 (encoder-decoder)",
          "HuggingFace Transformers & Datasets", "Fine-tuning for classification, NER, Q&A"
        ],
        resources: [
          { icon: "📖", name: "The Illustrated Transformer — Jay Alammar", type: "Must-Read Blog", url: "https://jalammar.github.io/illustrated-transformer/" },
          { icon: "🧑‍💻", name: "HuggingFace NLP Course (Free)", type: "Free Course", url: "https://huggingface.co/learn/nlp-course/" },
          { icon: "🎥", name: "Karpathy — Let's build GPT from scratch", type: "YouTube", url: "https://www.youtube.com/@AndrejKarpathy" },
          { icon: "📖", name: "Attention Is All You Need (original paper)", type: "Research Paper", url: "https://arxiv.org/abs/1706.03762" },
        ]
      },
      {
        emoji: "✨",
        title: "Generative AI & LLMs",
        subtitle: "Build on top of the most powerful models ever created",
        tag: "Frontier",
        desc: "LLMs have changed what's possible to build in a weekend. As an AI engineer, you need to know how to work with these models strategically: prompting, RAG architectures, fine-tuning, and building agents. This is the highest-demand skillset right now.",
        topics: [
          "Prompt engineering (zero/few-shot, chain-of-thought)", "Retrieval-Augmented Generation (RAG)",
          "Vector databases (ChromaDB, Pinecone, Weaviate)", "Embeddings & semantic search",
          "Fine-tuning (full fine-tune, LoRA, QLoRA)", "RLHF concepts & DPO",
          "LangChain & LlamaIndex", "OpenAI / Anthropic / Cohere APIs",
          "Function calling & tool use", "Structured output generation",
          "LLM evaluation & evals frameworks", "Hallucination mitigation strategies", "Guardrails & safety"
        ],
        resources: [
          { icon: "🧑‍💻", name: "DeepLearning.ai — Short LLM Courses (Free)", type: "Free Courses", url: "https://www.deeplearning.ai/short-courses/" },
          { icon: "📖", name: "LangChain Docs — RAG Tutorials", type: "Documentation", url: "https://python.langchain.com/docs/tutorials/rag/" },
          { icon: "🎥", name: "Karpathy — Intro to Large Language Models", type: "YouTube", url: "https://www.youtube.com/watch?v=zjkBMFhNj_g" },
          { icon: "🧑‍💻", name: "HuggingFace PEFT / LoRA Guide", type: "Documentation", url: "https://huggingface.co/docs/peft/" },
        ]
      }
    ]
  },
  {
    id: 5,
    phase: "MLOps & Production",
    weeks: "Weeks 21–26",
    color: "var(--rose)",
    cards: [
      {
        emoji: "🚢",
        title: "ML Deployment",
        subtitle: "Get your models running in the real world — reliably, at scale",
        tag: "Engineer",
        desc: "Most ML courses stop at training. But deploying and maintaining models is where the real engineering lives. Learn to serve models as REST APIs, containerize them with Docker, validate inputs, and gracefully handle failures. This is what bridges data science and software engineering.",
        topics: [
          "FastAPI for ML model serving", "Docker & containerization",
          "Model serialization (joblib, pickle, ONNX)", "REST API design for ML",
          "Batch vs real-time inference", "Input validation with Pydantic",
          "Model versioning strategies", "Health checks & readiness probes",
          "Gradio / Streamlit for rapid demos", "Load testing with Locust",
          "Basic auth & API security", "Async inference patterns"
        ],
        resources: [
          { icon: "🎥", name: "Patrick Loeber — Deploy ML with FastAPI", type: "YouTube", url: "https://www.youtube.com/@patloeber" },
          { icon: "📖", name: "Docker Official Get Started Guide", type: "Documentation", url: "https://docs.docker.com/get-started/" },
          { icon: "🧑‍💻", name: "FastAPI Official Documentation", type: "Documentation", url: "https://fastapi.tiangolo.com/" },
          { icon: "📖", name: "Designing ML Systems — Chip Huyen", type: "Book", url: "https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/" },
        ]
      },
      {
        emoji: "🔄",
        title: "MLOps & Experiment Tracking",
        subtitle: "Build reproducible, auditable ML pipelines — not spaghetti notebooks",
        tag: "Engineer",
        desc: "MLOps separates professionals from notebook cowboys. Experiment tracking makes your work reproducible and comparable. Pipelines make collaboration possible. Monitoring catches model degradation before it costs your company. These tools are expected at every serious ML team.",
        topics: [
          "MLflow (tracking, projects, model registry)", "Weights & Biases (W&B) for experiment tracking",
          "DVC for data version control", "Comparing experiments systematically",
          "Model registry & staging/production transitions", "Automated retraining triggers",
          "Data drift & concept drift detection", "CI/CD for ML with GitHub Actions",
          "Airflow or Prefect for pipeline orchestration", "Great Expectations for data validation",
          "A/B testing ML models in production"
        ],
        resources: [
          { icon: "🧑‍💻", name: "MLflow Quickstart & Tutorials", type: "Documentation", url: "https://mlflow.org/docs/latest/tutorials-and-examples/" },
          { icon: "🧑‍💻", name: "Weights & Biases — Getting Started", type: "Documentation", url: "https://docs.wandb.ai/quickstart" },
          { icon: "🎥", name: "Made With ML — MLOps Course (Free)", type: "Free Course", url: "https://madewithml.com/" },
          { icon: "📖", name: "ML Engineering for Production — deeplearning.ai", type: "Coursera", url: "https://www.coursera.org/specializations/machine-learning-engineering-for-production-mlops" },
        ]
      },
      {
        emoji: "☁️",
        title: "Cloud & Infrastructure",
        subtitle: "Run models at scale — pick AWS or GCP and go deep",
        tag: "Engineer",
        desc: "Cloud skills multiply your ability to work at scale. You don't need to be a cloud architect, but you need to confidently provision compute, store large datasets, run distributed training, and deploy endpoints. AWS and GCP are the most common in industry.",
        topics: [
          "S3 / GCS for data storage", "EC2 / GCE compute instances",
          "GPU instances for training (g4dn, A100s)", "SageMaker or Vertex AI managed ML",
          "Lambda / Cloud Functions for serverless", "Container registries (ECR / Artifact Registry)",
          "IAM & permissions basics", "Cost management & spot instances",
          "Kubernetes basics (pods, deployments)", "CI/CD pipelines for model deployment",
          "Infrastructure as Code (Terraform basics)"
        ],
        resources: [
          { icon: "🧑‍💻", name: "AWS Machine Learning Learning Path (Free)", type: "Free Course", url: "https://aws.amazon.com/training/learn-about/machine-learning/" },
          { icon: "🧑‍💻", name: "Google Cloud ML Engineer Path", type: "Free Courses", url: "https://cloud.google.com/learn/training/machinelearning-ai" },
          { icon: "📖", name: "SageMaker Studio Lab (Free GPU)", type: "Free Tool", url: "https://studiolab.sagemaker.aws/" },
          { icon: "🧑‍💻", name: "The Cloud Resume Challenge", type: "Hands-on Project", url: "https://cloudresumechallenge.dev/" },
        ]
      }
    ]
  }
];
