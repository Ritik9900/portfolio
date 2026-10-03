// Kaggle competitions (kaggle.com/ritik9929 → Your Work → Competitions).
//
// Only competitions with a published notebook are listed. Notebooks live in public/notebooks/;
// `notebook` is the filename there (or omit it and name the file <slug>.ipynb).
//
// Fields: rank/teams from the final leaderboard (rank: null = unranked); `team: true` for team
// entries; `context` is the competition's name on Kaggle; `summary` describes the task; `approach`
// is written from what the notebook shows. Percentiles are computed, never typed by hand.
// Plain ES module (no Vite-specific imports) so build scripts can read it too.

export const competitions = [
  {
    slug: 'recipe-for-rating',
    notebook: 'Recipe_for_Rating_Predict_food_Ratings_using_ML.ipynb',
    title: 'Recipe for Rating',
    context: 'Recipe for Rating: Predict Food Ratings using ML',
    type: 'Community',
    domain: 'NLP · Tabular',
    rank: 3,
    teams: 950,
    metric: { name: 'Best validation accuracy', value: '78.7%' },
    summary:
      'Predict a recipe review\'s star rating (six classes, 0–5) from the review text and engagement ' +
      'signals. 13.6K training reviews, heavily skewed: three-quarters are 5-star.',
    approach: [
      'One scikit-learn ColumnTransformer pipeline: bag-of-words on the cleaned review text, one-hot recipe codes, and polynomial + log1p + robust-scaled engagement counts (replies, thumbs up/down).',
      'Compared logistic regression, XGBoost and an SVC on a stratified 80/20 split; tuned XGBoost reached 78.7% validation accuracy.',
      'The final submission soft-votes logistic regression and XGBoost, then re-weights the class probabilities to counter the 5-star imbalance before taking the argmax.'
    ],
    stack: ['scikit-learn', 'XGBoost', 'CountVectorizer', 'pandas']
  },
  {
    slug: 'predict-introverts-extroverts',
    notebook: 'Predict_the_introverts_from_the_extroverts.ipynb',
    title: 'Predict the Introverts from the Extroverts',
    context: 'Playground Series · Season 5, Episode 7',
    type: 'Playground',
    domain: 'Tabular',
    rank: 73,
    teams: 4329,
    metric: { name: '10-fold CV accuracy', value: '96.9%' },
    summary:
      'Classify personality type from seven behavioural features — time alone, social events, friends circle, ' +
      'posting frequency and more — on 18.5K rows with missing values in every feature.',
    approach: [
      'Median / most-frequent imputation, scaling and one-hot encoding inside a pipeline, so preprocessing is fitted per fold.',
      'SMOTE runs inside the imbalanced-learn pipeline, so oversampling touches only each fold\'s training data and never leaks into validation.',
      'Logistic regression, LightGBM and XGBoost evaluated with 10-fold stratified CV (out-of-fold accuracy 0.968–0.969), then soft-voted, with test probabilities averaged across folds and models.'
    ],
    stack: ['scikit-learn', 'imbalanced-learn (SMOTE)', 'LightGBM', 'XGBoost']
  },
  {
    slug: 'image-classification-animals-plants',
    notebook: 'Image_Classification.ipynb',
    title: 'Image Classification: Animals & Plants',
    context: 'Deep Learning Practice || Image Classification',
    type: 'Community',
    domain: 'Computer vision',
    rank: 4,
    teams: 167,
    summary:
      'Classify images into ten taxonomic groups — amphibians, birds, fungi, insects, mammals, plants and more — ' +
      'with about 1,000 training images per class.',
    approach: [
      'Transfer learning from torchvision\'s ViT-H/14 with SWAG weights: the backbone is frozen and only a small MLP head (1280 → 128 → 10, BatchNorm, GELU, dropout) is trained.',
      'Training augmentation with flips, rotation and padded random crops at 224 px, plus ImageNet normalisation.',
      'Mixed-precision training across two GPUs with DataParallel; nine epochs took the training loss from 0.47 to 0.12.'
    ],
    stack: ['PyTorch', 'torchvision', 'ViT-H/14 (SWAG)', 'AMP', 'Multi-GPU']
  },
  {
    slug: 'mosquito-object-detection',
    notebook: 'Mosquito_dataset_object_detection.ipynb',
    title: 'Mosquito Object Detection',
    context: 'DLP Object Detection || Week 10',
    type: 'Community',
    domain: 'Computer vision',
    rank: 4,
    teams: 156,
    metric: { name: 'Validation mAP@50', value: '0.519' },
    summary:
      'Detect and classify mosquitoes into six species — aegypti, albopictus, anopheles, culex, culiseta and ' +
      'japonicus/koreicus — across 7,500 training images.',
    approach: [
      'Converted the data to YOLO format with a seeded 90/10 train/validation split and fine-tuned COCO-pretrained YOLOv8m at 1024 px for 30 epochs on a T4.',
      'Validation mAP@50 of 0.519 overall and above 0.95 for albopictus and culex. The per-class breakdown shows the two weakest classes have only 2 and 6 validation instances.',
      'Low-confidence inference keeps the best box per image, with a fallback for images with no detection; the submission is generated and uploaded end to end through the Kaggle API.'
    ],
    stack: ['Ultralytics YOLOv8', 'PyTorch', 'Kaggle API']
  },
  {
    slug: 'indictts-deepfake-detection',
    notebook: 'IndicTTS_Deepfake_Challenge.ipynb',
    title: 'IndicTTS Deepfake Detection',
    context: 'IndicTTS Deepfake Challenge',
    type: 'Community',
    domain: 'Audio',
    period: 'Jan — Feb 2025',
    rank: 9,
    teams: 201,
    metric: { name: 'ROC-AUC', value: '0.923' },
    summary: 'Detect AI-generated (TTS) speech across 16 Indian languages, over 33K+ audio clips (~63 hours).',
    approach: [
      'Treated audio deepfake detection as image classification: each clip becomes a 128-band log-mel spectrogram at 16 kHz, normalised and resized to a 3-channel 224 × 224 image.',
      'Fine-tuned an ImageNet-pretrained ViT-B/16 (timm) with AdamW for 15 epochs, scoring each epoch by validation ROC-AUC.',
      'Single-model inference outputs the probability that each clip is synthetic.'
    ],
    stack: ['PyTorch', 'timm ViT-B/16', 'librosa', 'scikit-learn']
  },
  {
    slug: 'low-light-denoising-super-resolution',
    notebook: 'Denoising_and_4x_Super-Resolution_of_Low-Light_Images.ipynb',
    title: 'Low-Light Denoising & 4× Super-Resolution',
    context: 'DLP Jan 2025 || NPPE3',
    type: 'Community',
    domain: 'Computer vision',
    period: 'Mar — Apr 2025',
    rank: 13,
    teams: 210,
    metric: { name: 'Best validation MSE', value: '1.44 × 10⁻⁴' },
    summary: 'Restore noisy low-light images and upscale them 4× in a single model.',
    approach: [
      'Two networks chained end to end: an MRPNet-style encoder–decoder removes noise, then an SRGAN-style generator with a residual block and two PixelShuffle stages upsamples 4×.',
      'Trained on pixel-wise MSE with Adam, mixed precision and DataParallel for 70 epochs, keeping the checkpoint with the best validation loss.',
      'Inference and submission formatting are scripted, including automated upload through the Kaggle API.'
    ],
    stack: ['PyTorch', 'PixelShuffle', 'AMP', 'Multi-GPU', 'Kaggle API']
  },
  {
    slug: 'movie-review-sentiment',
    notebook: 'sentiment_prediction_on_movie_reviews.ipynb',
    title: 'Sentiment Prediction on Movie Reviews',
    context: 'Sentiment Prediction on Movie reviews',
    type: 'Community',
    domain: 'NLP',
    period: 'May — Aug 2023',
    rank: 79,
    teams: 977,
    metric: { name: 'Micro-F1', value: '83.20%' },
    summary: 'Classify 163K movie reviews as positive or negative, with a movie-metadata table available to join.',
    approach: [
      'Enriched each review with movie metadata (audience score, runtime) through a merge on movie ID.',
      'A FeatureUnion combines word and bigram TF-IDF on the review text with imputed, scaled numeric features.',
      'Compared a dummy baseline, KNN, Naive Bayes, logistic regression, SGD and LinearSVC; LinearSVC scored 82.7% holdout accuracy and 0.894 ROC-AUC and was used for the submission.'
    ],
    stack: ['scikit-learn', 'TF-IDF', 'LinearSVC', 'pandas']
  },
  {
    slug: 'multilingual-sentiment-llama',
    notebook: 'Multi-Lingual_Sentiment_Analysis.ipynb',
    title: 'Multilingual Sentiment Analysis',
    context: 'Multi-Lingual Sentiment Analysis',
    type: 'Community',
    domain: 'NLP · LLM fine-tuning',
    rank: 67,
    teams: 223,
    summary: 'Fine-tune LLaMA 3.1-8B-Instruct to classify sentiment across Indian languages.',
    approach: [
      'QLoRA fine-tuning of Llama-3.1-8B-Instruct with Unsloth on a single T4: 4-bit base weights and rank-32 rsLoRA adapters on all attention and MLP projections, about 1% of parameters trainable.',
      'Framed classification as instruction following with an Alpaca-style prompt and packed sequences, trained with TRL\'s SFTTrainer and 8-bit AdamW.',
      'Predictions are generated at low temperature and mapped back onto the label set.'
    ],
    stack: ['Unsloth', 'Llama 3.1 8B', 'QLoRA', 'TRL', 'Hugging Face']
  },
  {
    slug: 'used-car-price-regression',
    notebook: 'Regression_of_Used_car_prices.ipynb',
    title: 'Regression of Used Car Prices',
    context: 'Playground Series · Season 4, Episode 9',
    type: 'Playground',
    domain: 'Tabular',
    rank: 1313,
    teams: 3066,
    team: true,
    metric: { name: 'Validation RMSE', value: '67,887' },
    summary: 'Predict used-car prices from 188K listings with brand, mileage, engine and accident history.',
    approach: [
      'Regex feature extraction turns the free-text engine field into horsepower, engine size and engine type.',
      'Imputation and one-hot encoding in a shared pipeline, then XGBoost, CatBoost and LightGBM compared on the same 80/20 split.',
      'LightGBM had the lowest validation RMSE (67,887, against 68,227 for CatBoost and 69,849 for XGBoost) and produced the submission.'
    ],
    stack: ['LightGBM', 'CatBoost', 'XGBoost', 'scikit-learn']
  }
]

/** Percentile rounded up to one decimal (conservative), or null when unranked. */
export function percentile(c) {
  if (!c.rank) return null
  return Math.ceil((c.rank / c.teams) * 1000) / 10
}

/** "Top 4.5%" for finishes in the top quarter; otherwise null so only the rank is shown. */
export function standing(c) {
  const p = percentile(c)
  return p !== null && p <= 25 ? `Top ${p}%` : null
}

/** Best finishes first; unranked entries last. */
export const ranked = () => [...competitions].sort((a, b) => (percentile(a) ?? 101) - (percentile(b) ?? 101))

export const topTenCount = () => competitions.filter((c) => (percentile(c) ?? 101) <= 10).length

export function findCompetition(slug) {
  return competitions.find((c) => c.slug === slug)
}
