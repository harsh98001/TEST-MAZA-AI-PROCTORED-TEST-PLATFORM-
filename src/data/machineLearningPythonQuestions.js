const UNIT_BY_RANGE = [
  { max: 35, name: 'UNIT I - Introduction to ML' },
  { max: 70, name: 'UNIT II - Supervised Learning' },
  { max: 105, name: 'UNIT III - Unsupervised Learning & Feature Engineering' },
  { max: 140, name: 'UNIT IV - Neural Networks & Deep Learning' },
  { max: 160, name: 'UNIT V - Explainability, Ethics & Deployment' },
  { max: 200, name: 'UNIT VI - Generative AI & Emerging Trends' },
];

const rawMachineLearningQuestions = String.raw`
Q1. What does ML stand for in the context of artificial intelligence?
A) Machine Language
B) Machine Learning
C) Mathematical Logic
D) Model Learning
Answer: B
Explanation: ML stands for Machine Learning - the study of algorithms that learn from data.
Q2. Which of the following is NOT a type of machine learning?
A) Supervised Learning
B) Unsupervised Learning
C) Reinforcement Learning
D) Deterministic Learning
Answer: D
Explanation: The three main types are Supervised, Unsupervised, and Reinforcement Learning.
Q3. In supervised learning, the training data includes:
A) Only input features
B) Only output labels
C) Both input features and output labels
D) Neither inputs nor outputs
Answer: C
Explanation: Supervised learning uses labeled data - both inputs (features) and outputs (labels).
Q4. Which type of ML uses rewards and penalties to train an agent?
A) Supervised
B) Unsupervised
C) Reinforcement
D) Semi-supervised
Answer: C
Explanation: Reinforcement Learning trains agents via reward signals from the environment.
Q5. Overfitting occurs when a model:
A) Performs well on both training and test data
B) Performs well on training data but poorly on test data
C) Performs poorly on training data
D) Cannot converge during training
Answer: B
Explanation: Overfitting means the model memorizes training data but fails to generalize to new data.
Q6. Underfitting is characterized by:
A) High training accuracy
B) Low training and low test accuracy
C) Low training accuracy and high test accuracy
D) High variance
Answer: B
Explanation: Underfitting means the model is too simple to capture patterns - poor on both sets.
Q7. The bias-variance tradeoff implies that:
A) High bias leads to overfitting
B) High variance leads to underfitting
C) Reducing bias often increases variance
D) Bias and variance are independent
Answer: C
Explanation: Reducing bias with a more complex model typically increases variance, causing overfitting.
Q8. Which Python library is primarily used for numerical computations?
A) Pandas
B) Matplotlib
C) NumPy
D) scikit-learn
Answer: C
Explanation: NumPy provides array operations and numerical computing capabilities.
Q9. Which library provides DataFrame objects for data manipulation?
A) NumPy
B) Pandas
C) PyTorch
D) Keras
Answer: B
Explanation: Pandas provides the DataFrame structure for tabular data manipulation.
Q10. scikit-learn is primarily used for:
A) Deep learning
B) Traditional ML algorithms
C) Data visualization
D) Web development
Answer: B
Explanation: scikit-learn provides traditional ML algorithms - regression, classification, clustering, etc.
Q11. A model with high bias is likely to:
A) Overfit the training data
B) Underfit the training data
C) Have high variance
D) Generalize perfectly
Answer: B
Explanation: High bias means the model has strong assumptions and underfits the data.
Q12. Which scenario best describes a classification task?
A) Predicting house prices
B) Grouping customers by behavior
C) Predicting if an email is spam
D) Generating new images
Answer: C
Explanation: Classification assigns inputs to discrete categories - spam/not-spam is a classic example.
Q13. The generalization ability of a model refers to its:
A) Speed of training
B) Performance on unseen data
C) Number of parameters
D) Training accuracy
Answer: B
Explanation: Generalization is how well the model performs on new, unseen data.
Q14. Which of the following is a regression task?
A) Identifying handwritten digits
B) Predicting tomorrow's temperature
C) Clustering news articles
D) Detecting fraud as yes/no
Answer: B
Explanation: Predicting a continuous numeric value such as temperature is regression.
Q15. In unsupervised learning, the training data:
A) Has labels
B) Has no labels
C) Must be time-series
D) Requires human annotation
Answer: B
Explanation: Unsupervised learning finds patterns in unlabeled data.
Q16. Which of the following best prevents overfitting?
A) Using more training data
B) Using a more complex model
C) Removing all regularization
D) Increasing model depth
Answer: A
Explanation: More training data helps the model learn general patterns rather than memorize.
Q17. The term 'features' in ML refers to:
A) Model outputs
B) Input variables
C) Reward signals
D) Hyperparameters
Answer: B
Explanation: Features are the input variables used to make predictions.
Q18. Which Python library is most commonly used for ML workflows including preprocessing and model evaluation?
A) TensorFlow
B) PyTorch
C) scikit-learn
D) OpenCV
Answer: C
Explanation: scikit-learn provides preprocessing, modeling, and evaluation tools.
Q19. A model that always predicts the mean of the training set has:
A) High variance, low bias
B) Low variance, high bias
C) Zero bias
D) Perfect accuracy
Answer: B
Explanation: Predicting the mean always is very simple, so it has high bias and low variance.
Q20. What is the purpose of splitting data into train and test sets?
A) To speed up computation
B) To evaluate model performance on unseen data
C) To remove outliers
D) To balance the dataset
Answer: B
Explanation: The test set simulates unseen data and measures generalization.
Q21. Which type of ML is used to play games like Chess and Go?
A) Supervised
B) Unsupervised
C) Reinforcement
D) Transfer
Answer: C
Explanation: Reinforcement Learning learns via trial, error, and rewards.
Q22. The workflow of a typical ML project includes which step first?
A) Model deployment
B) Data collection and preparation
C) Hyperparameter tuning
D) Model evaluation
Answer: B
Explanation: Data collection and preparation is the first critical step in ML workflows.
Q23. High variance in a model typically leads to:
A) Underfitting
B) Overfitting
C) Perfect generalization
D) Low training error and low test error
Answer: B
Explanation: High variance means the model is too sensitive to training data fluctuations.
Q24. Which of the following is an example of unsupervised learning?
A) Spam detection
B) Stock price prediction
C) Customer segmentation
D) Disease diagnosis
Answer: C
Explanation: Customer segmentation groups customers without predefined labels.
Q25. Python's popularity in ML is mainly due to:
A) Its speed comparable to C++
B) Its rich ecosystem of ML libraries
C) It being a compiled language
D) Its use in operating systems
Answer: B
Explanation: Python has rich libraries such as NumPy, pandas, scikit-learn, TensorFlow, and PyTorch.
Q26. Which import gives access to array operations in Python?
A) import pandas as pd
B) import numpy as np
C) import sklearn
D) import matplotlib
Answer: B
Explanation: import numpy as np gives access to NumPy's array and math operations.
Q27. What does the bias term represent in a machine learning model?
A) The model's complexity
B) The offset or intercept of the decision boundary
C) The learning rate
D) The number of features
Answer: B
Explanation: Bias is the offset/intercept term in many models.
Q28. Semi-supervised learning uses:
A) Only labeled data
B) Only unlabeled data
C) Both labeled and unlabeled data
D) Only test data
Answer: C
Explanation: Semi-supervised learning leverages both labeled and unlabeled datasets.
Q29. Which of the following is a hyperparameter?
A) Model weights
B) Bias terms
C) Learning rate
D) Activation values
Answer: C
Explanation: Learning rate is set before training, so it is a hyperparameter.
Q30. The main goal of machine learning is to:
A) Write explicit rules for every scenario
B) Learn patterns from data to make predictions
C) Store large amounts of data
D) Simulate human brain neurons exactly
Answer: B
Explanation: ML learns patterns from data to make predictions on new examples.
Q31. Which Python function displays the first 5 rows of a DataFrame?
A) df.tail()
B) df.head()
C) df.info()
D) df.describe()
Answer: B
Explanation: df.head() returns the first 5 rows by default.
Q32. The NumPy function to compute the mean of an array is:
A) np.average()
B) np.sum()
C) np.mean()
D) np.median()
Answer: C
Explanation: np.mean() computes the arithmetic mean of array elements.
Q33. What is EDA in the context of data analysis?
A) Error Detection Algorithm
B) Exploratory Data Analysis
C) Encoding Data Arrays
D) Ensemble Decision Algorithm
Answer: B
Explanation: EDA means Exploratory Data Analysis.
Q34. Which Pandas method shows data types and non-null counts?
A) df.describe()
B) df.info()
C) df.shape
D) df.head()
Answer: B
Explanation: df.info() displays column names, data types, and non-null counts.
Q35. Which Pandas method computes summary statistics like mean and std?
A) df.info()
B) df.head()
C) df.describe()
D) df.values()
Answer: C
Explanation: df.describe() returns count, mean, std, min, quartiles, and max for numeric columns.
Q36. Linear Regression is used for:
A) Classification tasks
B) Regression (predicting continuous values)
C) Clustering
D) Dimensionality reduction
Answer: B
Explanation: Linear Regression models the relationship between inputs and a continuous output.
Q37. The cost function minimized in Linear Regression is:
A) Cross-Entropy Loss
B) Mean Squared Error (MSE)
C) Hinge Loss
D) Log Loss
Answer: B
Explanation: Linear Regression minimizes MSE.
Q38. Logistic Regression outputs:
A) A continuous value
B) A probability between 0 and 1
C) A cluster label
D) A ranked list
Answer: B
Explanation: Logistic Regression uses the sigmoid function to output probabilities.
Q39. In k-NN classification, 'k' refers to:
A) The number of features
B) The number of nearest neighbors considered
C) The number of classes
D) The learning rate
Answer: B
Explanation: k-NN classifies a point by looking at its k nearest neighbors.
Q40. Which algorithm uses Bayes' theorem assuming feature independence?
A) k-NN
B) SVM
C) Naive Bayes
D) Random Forest
Answer: C
Explanation: Naive Bayes applies Bayes' theorem with the naive independence assumption.
Q41. A Decision Tree splits data based on:
A) Random features
B) Features that maximize information gain
C) The first feature in the dataset
D) The mean of all features
Answer: B
Explanation: Decision Trees choose splits that maximize information gain or reduce impurity.
Q42. Random Forest is an ensemble of:
A) Support Vector Machines
B) Decision Trees
C) Logistic Regression models
D) Neural Networks
Answer: B
Explanation: Random Forest builds many Decision Trees and aggregates their predictions.
Q43. Support Vector Machine (SVM) aims to find:
A) The decision tree with maximum depth
B) The maximum-margin hyperplane
C) The best cluster centroids
D) The optimal neural network weights
Answer: B
Explanation: SVM finds the hyperplane that maximizes margin between classes.
Q44. Accuracy is defined as:
A) TP / (TP + FP)
B) (TP + TN) / (TP + TN + FP + FN)
C) TP / (TP + FN)
D) 2 * Precision * Recall / (Precision + Recall)
Answer: B
Explanation: Accuracy equals correct predictions divided by total predictions.
Q45. Precision is defined as:
A) TP / (TP + FN)
B) TP / (TP + FP)
C) TN / (TN + FP)
D) (TP + TN) / Total
Answer: B
Explanation: Precision is TP / (TP + FP).
Q46. Recall (Sensitivity) is defined as:
A) TP / (TP + FP)
B) TP / (TP + FN)
C) TN / (TN + FN)
D) FP / (FP + TN)
Answer: B
Explanation: Recall is TP / (TP + FN).
Q47. F1 Score is the:
A) Arithmetic mean of precision and recall
B) Harmonic mean of precision and recall
C) Geometric mean of precision and recall
D) Sum of precision and recall
Answer: B
Explanation: F1 is the harmonic mean of precision and recall.
Q48. ROC-AUC measures:
A) Model training speed
B) The ability to discriminate between classes across thresholds
C) Only precision at threshold 0.5
D) Memory usage
Answer: B
Explanation: ROC-AUC measures classification performance across thresholds.
Q49. Cross-validation helps to:
A) Speed up model training
B) Reliably estimate model performance using multiple train-test splits
C) Remove outliers
D) Increase dataset size
Answer: B
Explanation: Cross-validation gives a more reliable performance estimate.
Q50. L2 regularization adds to the loss function:
A) The sum of absolute weights
B) The sum of squared weights multiplied by a penalty
C) The number of features
D) The model depth
Answer: B
Explanation: L2 regularization penalizes large weights using squared weight terms.
Q51. L1 regularization is also known as:
A) Ridge
B) Lasso
C) Elastic Net
D) Dropout
Answer: B
Explanation: L1 regularization is called Lasso.
Q52. In k-NN, what happens when k is very large?
A) The model overfits
B) The model underfits
C) The model trains faster
D) The model always predicts class 1
Answer: B
Explanation: Large k smooths the decision boundary and can underfit.
Q53. Which kernel allows SVM to classify non-linearly separable data?
A) Linear kernel
B) RBF (Radial Basis Function) kernel
C) No kernel
D) Identity kernel
Answer: B
Explanation: RBF maps data to higher-dimensional space for nonlinear separation.
Q54. What is the purpose of a confusion matrix?
A) Visualize feature correlations
B) Show counts of TP, TN, FP, FN for classification
C) Show model weights
D) Display training loss curves
Answer: B
Explanation: A confusion matrix shows TP, TN, FP, and FN counts.
Q55. In k-fold cross-validation with k=5, the data is split into:
A) 2 parts
B) 5 equal parts
C) 10 parts
D) Random parts
Answer: B
Explanation: k=5 splits data into 5 folds.
Q56. Which metric is most useful when classes are highly imbalanced?
A) Accuracy
B) F1 Score
C) Training loss
D) Model size
Answer: B
Explanation: F1 Score considers both precision and recall.
Q57. Random Forest reduces overfitting compared to a single Decision Tree by:
A) Using deeper trees
B) Averaging predictions of many trees trained on random subsets
C) Using more features
D) Using a higher learning rate
Answer: B
Explanation: Averaging many diverse trees reduces variance.
Q58. The sigmoid function outputs values in the range:
A) [-1, 1]
B) [0, 1]
C) [0, infinity)
D) (-infinity, infinity)
Answer: B
Explanation: sigmoid outputs values between 0 and 1.
Q59. Which algorithm is most sensitive to feature scale?
A) Decision Tree
B) k-NN
C) Naive Bayes
D) Random Forest
Answer: B
Explanation: k-NN uses distance metrics, so scale matters strongly.
Q60. What does MAE stand for in regression evaluation?
A) Mean Absolute Error
B) Maximum Absolute Error
C) Mean Aggregated Error
D) Minimum Absolute Error
Answer: A
Explanation: MAE is Mean Absolute Error.
Q61. R-squared value of 1 means:
A) The model explains none of the variance
B) The model explains all variance in the data
C) The model has infinite error
D) The model is overfitting
Answer: B
Explanation: R-squared of 1 means perfect explained variance.
Q62. Gini impurity in Decision Trees measures:
A) The probability of correct classification
B) The probability of misclassifying a randomly chosen element
C) The depth of the tree
D) The number of leaf nodes
Answer: B
Explanation: Gini impurity measures expected misclassification if labeled by class distribution.
Q63. In Linear Regression, multicollinearity refers to:
A) Too many target variables
B) High correlation between input features
C) Nonlinear relationships
D) Missing values in data
Answer: B
Explanation: Multicollinearity means high correlation between input features.
Q64. Which of the following is a multi-class classification algorithm?
A) Linear Regression
B) k-NN
C) PCA
D) k-Means
Answer: B
Explanation: k-NN can handle multi-class classification by voting.
Q65. The hyperplane in SVM is chosen to:
A) Minimize training time
B) Maximize margin between classes
C) Minimize the number of features
D) Maximize training accuracy
Answer: B
Explanation: SVM maximizes the margin between classes.
Q66. Decision Tree Regressor predicts by:
A) Fitting a linear function
B) Returning the mean of training samples in a leaf node
C) Using sigmoid activation
D) Voting among multiple trees
Answer: B
Explanation: A Decision Tree Regressor returns the mean target value in each leaf.
Q67. A high recall but low precision indicates:
A) Many false negatives, few false positives
B) Many false positives, few false negatives
C) Perfect classification
D) Model underfitting
Answer: B
Explanation: High recall and low precision means many positives are caught, but with many false alarms.
Q68. Which regularization technique can shrink some coefficients to exactly zero?
A) L2 (Ridge)
B) L1 (Lasso)
C) Dropout
D) Batch Normalization
Answer: B
Explanation: L1/Lasso can drive some weights exactly to zero.
Q69. What is the default distance metric in scikit-learn k-NN?
A) Manhattan
B) Cosine
C) Euclidean (Minkowski p=2)
D) Chebyshev
Answer: C
Explanation: scikit-learn KNeighborsClassifier uses Minkowski distance with p=2 by default.
Q70. ROC curve plots:
A) Precision vs Recall
B) True Positive Rate vs False Positive Rate
C) Accuracy vs Loss
D) Feature importance vs Rank
Answer: B
Explanation: ROC plots TPR vs FPR across classification thresholds.
Q71. k-Means clustering requires the user to specify:
A) The cluster shapes
B) The number of clusters k
C) The distance metric only
D) No parameters
Answer: B
Explanation: k-Means requires k to be specified.
Q72. k-Means minimizes the:
A) Maximum distance between clusters
B) Within-cluster sum of squares (inertia)
C) Between-cluster distance
D) Number of outliers
Answer: B
Explanation: k-Means minimizes total within-cluster squared distances.
Q73. Hierarchical clustering produces:
A) k clusters
B) A dendrogram showing nested cluster structure
C) A confusion matrix
D) A 2D scatter plot
Answer: B
Explanation: Hierarchical clustering produces a dendrogram.
Q74. DBSCAN stands for:
A) Density-Based Spatial Clustering of Applications with Noise
B) Distance-Based Spectral Clustering Algorithm
C) Dual Bayesian Spatial Cluster Analysis
D) Deep-Based Scan Algorithm
Answer: A
Explanation: DBSCAN groups densely packed points and labels sparse points as noise.
Q75. DBSCAN can detect:
A) Only spherical clusters
B) Arbitrary-shaped clusters and outliers
C) Only linear clusters
D) Only two clusters
Answer: B
Explanation: DBSCAN finds arbitrary-shaped clusters and outliers.
Q76. PCA stands for:
A) Probabilistic Cluster Analysis
B) Principal Component Analysis
C) Partial Correlation Algorithm
D) Projected Cluster Assignment
Answer: B
Explanation: PCA reduces dimensionality using directions of maximum variance.
Q77. The first principal component in PCA captures:
A) The minimum variance direction
B) The maximum variance direction
C) The mean of all features
D) The most correlated feature
Answer: B
Explanation: PC1 explains the most variance.
Q78. t-SNE is primarily used for:
A) Classification
B) Regression
C) Visualization of high-dimensional data in 2D/3D
D) Feature selection
Answer: C
Explanation: t-SNE visualizes high-dimensional data in low dimensions.
Q79. One-Hot Encoding converts:
A) Numerical features to categorical
B) Categorical features to binary vectors
C) Text to numbers using hashing
D) Images to pixel arrays
Answer: B
Explanation: One-Hot Encoding represents categories as binary vectors.
Q80. Min-Max scaling transforms features to the range:
A) [-1, 1]
B) [0, 1]
C) [0, infinity)
D) Mean=0, Std=1
Answer: B
Explanation: Min-Max scaling maps values to [0, 1].
Q81. StandardScaler transforms features to have:
A) Range [0, 1]
B) Mean=0 and Standard Deviation=1
C) All positive values
D) Integer values
Answer: B
Explanation: StandardScaler produces zero mean and unit variance.
Q82. Which method handles missing values by filling with the column mean?
A) Dropna
B) Mean imputation
C) Label encoding
D) Feature hashing
Answer: B
Explanation: Mean imputation replaces missing values with the column mean.
Q83. Outlier detection using IQR considers outliers as values:
A) Within [Q1-1.5*IQR, Q3+1.5*IQR]
B) Outside [Q1-1.5*IQR, Q3+1.5*IQR]
C) Equal to the mean
D) Equal to the median
Answer: B
Explanation: Values outside the IQR fences are flagged as outliers.
Q84. Filter methods for feature selection use:
A) A machine learning model to rank features
B) Statistical measures independent of the model
C) Recursive feature elimination
D) Cross-validation
Answer: B
Explanation: Filter methods use statistical measures independent of the model.
Q85. Wrapper methods for feature selection:
A) Use statistics only
B) Train a model repeatedly to evaluate feature subsets
C) Never use cross-validation
D) Are faster than filter methods
Answer: B
Explanation: Wrapper methods train a model repeatedly to evaluate feature subsets.
Q86. Embedded feature selection methods perform feature selection:
A) Before model training
B) After model training
C) During model training (e.g., Lasso)
D) Only on test data
Answer: C
Explanation: Embedded methods incorporate feature selection during model training.
Q87. The elbow method in k-Means is used to:
A) Choose the best k
B) Detect outliers
C) Split data
D) Reduce dimensions
Answer: A
Explanation: The elbow method helps choose k.
Q88. PCA is a:
A) Supervised dimensionality reduction technique
B) Unsupervised linear dimensionality reduction technique
C) Clustering algorithm
D) Classification algorithm
Answer: B
Explanation: PCA is unsupervised and linear.
Q89. In DBSCAN, the parameter 'eps' defines:
A) The number of clusters
B) The maximum radius for neighborhood
C) The minimum points in a cluster
D) The distance metric
Answer: B
Explanation: eps defines the neighborhood radius.
Q90. Which clustering algorithm does NOT require specifying k beforehand?
A) k-Means
B) k-Medoids
C) DBSCAN
D) Gaussian Mixture Model
Answer: C
Explanation: DBSCAN determines cluster count from density parameters.
Q91. Label Encoding converts categories to:
A) Binary vectors
B) Integer values
C) Float values
D) Random strings
Answer: B
Explanation: Label Encoding assigns each category an integer.
Q92. The main limitation of One-Hot Encoding is:
A) It is slow
B) It creates high-dimensional sparse vectors for many categories
C) It cannot handle numbers
D) It requires scaling
Answer: B
Explanation: One-Hot Encoding can create many sparse columns.
Q93. t-SNE preserves:
A) Global structure perfectly
B) Local neighbor relationships in lower dimensions
C) Variance like PCA
D) Feature correlations
Answer: B
Explanation: t-SNE focuses on preserving local neighborhoods.
Q94. In hierarchical clustering, 'agglomerative' means:
A) Starting with all data in one cluster and splitting
B) Starting with each point as its own cluster and merging
C) Using a grid-based approach
D) Using density estimation
Answer: B
Explanation: Agglomerative clustering starts with individual points and merges them.
Q95. Which Pandas method drops rows with missing values?
A) df.fillna()
B) df.dropna()
C) df.replace()
D) df.isna()
Answer: B
Explanation: df.dropna() removes rows or columns containing NaN values.
Q96. Dimensionality reduction helps by:
A) Increasing model complexity
B) Reducing noise, computation time, and enabling visualization
C) Always improving accuracy
D) Increasing training data
Answer: B
Explanation: Dimensionality reduction reduces noise, computation, and aids visualization.
Q97. Feature engineering involves:
A) Selecting only numerical features
B) Creating new meaningful features or transforming existing ones
C) Removing all categorical variables
D) Scaling data to [0, 1] only
Answer: B
Explanation: Feature engineering creates or transforms features to better represent patterns.
Q98. Silhouette score is used to evaluate:
A) Regression models
B) Clustering quality
C) Classification accuracy
D) Neural network depth
Answer: B
Explanation: Silhouette score evaluates clustering quality.
Q99. Robust scaler uses:
A) Mean and standard deviation
B) Median and IQR
C) Min and Max
D) Log transformation
Answer: B
Explanation: RobustScaler uses median and IQR.
Q100. In PCA, components are:
A) Original features
B) Orthogonal linear combinations of features
C) Random projections
D) Nonlinear transformations
Answer: B
Explanation: PCA components are orthogonal linear combinations of original features.
Q101. Which step should be done BEFORE splitting data for proper practice?
A) Fit scalers on the full dataset
B) Only split data first, then fit scalers on training data only
C) Scale test data first
D) Use test data statistics for scaling
Answer: B
Explanation: Split first, then fit scalers on training data only to prevent leakage.
Q102. k-Means algorithm initialization with k-Means++ improves:
A) Speed only
B) The quality of initial cluster centers, reducing bad local minima
C) The number of features
D) Model interpretability
Answer: B
Explanation: k-Means++ spreads initial centroids apart.
Q103. Which of these is a tree-based embedded feature selection method?
A) Chi-square test
B) Pearson correlation
C) Feature importance from Random Forest
D) PCA
Answer: C
Explanation: Random Forest provides embedded feature importance scores.
Q104. DBSCAN's 'minPts' parameter defines:
A) Number of clusters
B) Maximum cluster size
C) Minimum points required to form a dense region
D) Number of noise points
Answer: C
Explanation: minPts defines how many neighbors make a core point.
Q105. Variance Inflation Factor (VIF) is used to detect:
A) Overfitting
B) Multicollinearity between features
C) Outliers
D) Missing values
Answer: B
Explanation: VIF measures multicollinearity between features.
Q106. A perceptron is:
A) A multi-layer neural network
B) A single artificial neuron with a step activation function
C) A clustering algorithm
D) A dimensionality reduction method
Answer: B
Explanation: A perceptron is the simplest neural unit.
Q107. The sigmoid activation function is defined as:
A) max(0, x)
B) tanh(x)
C) 1 / (1 + e^(-x))
D) x if x > 0 else alpha*x
Answer: C
Explanation: sigmoid(x) = 1/(1+e^(-x)).
Q108. ReLU activation function returns:
A) Values between 0 and 1
B) max(0, x)
C) tanh(x)
D) x for all x
Answer: B
Explanation: ReLU(x) = max(0, x).
Q109. MLP stands for:
A) Multiple Layer Processing
B) Multi-Layer Perceptron
C) Modular Learning Pipeline
D) Maximum Likelihood Prediction
Answer: B
Explanation: MLP means Multi-Layer Perceptron.
Q110. CNN stands for:
A) Conditional Neural Network
B) Convolutional Neural Network
C) Clustering Neural Network
D) Continuous Neural Network
Answer: B
Explanation: CNN means Convolutional Neural Network.
Q111. CNNs are particularly well-suited for:
A) Sequential time-series data
B) Image data due to spatial locality
C) Tabular data
D) Text translation
Answer: B
Explanation: CNNs exploit spatial structure in images.
Q112. RNN stands for:
A) Recursive Neural Network
B) Recurrent Neural Network
C) Reduced Neural Network
D) Relational Neural Network
Answer: B
Explanation: RNN means Recurrent Neural Network.
Q113. The vanishing gradient problem in RNNs refers to:
A) Gradients becoming too large
B) Gradients becoming very small over long sequences
C) Random initialization of weights
D) Memory overflow
Answer: B
Explanation: Gradients can shrink over long backpropagation paths.
Q114. LSTM was designed to solve:
A) The overfitting problem
B) The vanishing gradient problem in RNNs
C) The curse of dimensionality
D) The cold start problem
Answer: B
Explanation: LSTM gates help retain long-term dependencies.
Q115. GRU compared to LSTM:
A) Has more parameters and gates
B) Has fewer parameters (2 gates vs 3) and is simpler
C) Is not recurrent
D) Uses convolution
Answer: B
Explanation: GRU is simpler and has fewer gates than LSTM.
Q116. The attention mechanism in Transformers allows:
A) The model to focus on relevant parts of the input for each output
B) Convolutional filtering of sequences
C) Recurrent computation through time
D) Gradient clipping
Answer: A
Explanation: Attention computes weighted relationships between input positions.
Q117. Transformers replaced RNNs primarily because they:
A) Use less memory
B) Can be parallelized during training (no sequential dependency)
C) Are simpler
D) Use fewer parameters
Answer: B
Explanation: Transformers process all positions at once during training.
Q118. Batch normalization helps by:
A) Increasing the learning rate always
B) Normalizing layer inputs to stabilize and speed up training
C) Removing dropout
D) Adding more layers
Answer: B
Explanation: Batch normalization stabilizes and speeds training.
Q119. Dropout regularization works by:
A) Adding L2 penalty to weights
B) Randomly deactivating neurons during training to prevent co-adaptation
C) Removing features
D) Reducing learning rate
Answer: B
Explanation: Dropout randomly zeros neurons during training to reduce overfitting.
Q120. Backpropagation computes:
A) Forward predictions
B) Gradients of the loss with respect to each weight
C) Cluster assignments
D) Principal components
Answer: B
Explanation: Backpropagation uses the chain rule to compute gradients.
Q121. The pooling layer in a CNN:
A) Adds parameters
B) Downsamples feature maps, reducing spatial dimensions
C) Increases image resolution
D) Applies nonlinear activation
Answer: B
Explanation: Pooling reduces spatial size of feature maps.
Q122. Which framework is known for its dynamic computation graph?
A) TensorFlow 1.x
B) Keras
C) PyTorch
D) Theano
Answer: C
Explanation: PyTorch uses dynamic computation graphs.
Q123. Keras is a:
A) Low-level ML framework
B) High-level neural networks API running on TensorFlow
C) Standalone training algorithm
D) Data preprocessing library
Answer: B
Explanation: Keras is a high-level API on top of TensorFlow.
Q124. Hyperparameter tuning for neural networks includes adjusting:
A) Only the learning rate
B) Learning rate, batch size, number of layers, neurons per layer, etc.
C) Only the number of epochs
D) The training data
Answer: B
Explanation: Neural network hyperparameters include architecture and training settings.
Q125. The tanh activation function outputs values in:
A) [0, 1]
B) [-1, 1]
C) [0, infinity)
D) (-infinity, infinity)
Answer: B
Explanation: tanh outputs values from -1 to 1.
Q126. What is the role of the convolutional filter (kernel) in a CNN?
A) To classify the image directly
B) To detect local patterns by sliding over the input
C) To perform pooling
D) To normalize activations
Answer: B
Explanation: Convolutional filters detect local patterns.
Q127. In deep learning, 'epoch' refers to:
A) A single forward pass
B) One complete pass through the entire training dataset
C) A batch of data
D) One gradient update
Answer: B
Explanation: One epoch means the model has seen all training samples once.
Q128. Adam optimizer combines:
A) SGD and batch normalization
B) Momentum and RMSProp (adaptive learning rates)
C) L1 and L2 regularization
D) Dropout and weight decay
Answer: B
Explanation: Adam combines momentum-like estimates and adaptive learning rates.
Q129. Transfer learning uses:
A) Training from scratch on new data
B) Pretrained model weights as starting point for a new task
C) Only unsupervised data
D) Random weight initialization
Answer: B
Explanation: Transfer learning starts from pretrained weights.
Q130. Softmax activation is used in the output layer for:
A) Binary classification
B) Multi-class classification (outputs probability distribution)
C) Regression
D) Clustering
Answer: B
Explanation: Softmax converts logits to a probability distribution.
Q131. LSTM stands for:
A) Long Short-Term Memory
B) Large Scale Training Model
C) Linear Sequential Training Method
D) Layered Supervised Training Module
Answer: A
Explanation: LSTM means Long Short-Term Memory.
Q132. The 'batch size' hyperparameter refers to:
A) Total training samples
B) Number of samples processed per gradient update
C) Number of epochs
D) Number of layers
Answer: B
Explanation: Batch size is the number of samples used per gradient update.
Q133. Which activation function can suffer from the 'dying ReLU' problem?
A) Sigmoid
B) tanh
C) ReLU
D) Softmax
Answer: C
Explanation: ReLU neurons can die if they output 0 for all inputs.
Q134. Max pooling takes:
A) The average value in each window
B) The maximum value in each receptive field window
C) The minimum value
D) The sum of values
Answer: B
Explanation: Max pooling selects the largest value in each window.
Q135. In TensorFlow/Keras, model.compile() sets:
A) The model architecture
B) The optimizer, loss function, and metrics
C) The batch size
D) The learning rate only
Answer: B
Explanation: model.compile() configures optimizer, loss, and metrics.
Q136. Which architecture is most suitable for sentiment analysis of sentences?
A) CNN
B) Random Forest
C) RNN/LSTM
D) PCA
Answer: C
Explanation: RNN/LSTM models process sequential text.
Q137. Self-attention in Transformers computes relationships between:
A) Only adjacent tokens
B) All pairs of positions in the sequence simultaneously
C) Convolutional windows
D) Cluster centroids
Answer: B
Explanation: Self-attention computes relationships between all token positions.
Q138. Leaky ReLU addresses the dying ReLU problem by:
A) Using sigmoid instead
B) Allowing a small negative slope for negative inputs
C) Removing the activation
D) Using tanh
Answer: B
Explanation: Leaky ReLU keeps a small slope for negative inputs.
Q139. Grid search for hyperparameter tuning:
A) Tries random combinations
B) Exhaustively evaluates all specified combinations
C) Uses gradient descent
D) Only tunes learning rate
Answer: B
Explanation: Grid search evaluates every specified combination.
Q140. The skip connections in ResNet help by:
A) Reducing the number of layers
B) Allowing gradients to flow directly, enabling very deep networks
C) Adding convolutions
D) Removing batch normalization
Answer: B
Explanation: Skip connections improve gradient flow in deep networks.
Q141. SHAP stands for:
A) Shapley Additive Explanations
B) Simple Heuristic Approximation Program
C) Supervised Hierarchical Activation Patterns
D) Sparse High-dimensional Analysis Pipeline
Answer: A
Explanation: SHAP uses Shapley Additive Explanations.
Q142. LIME stands for:
A) Linear Interpretable Model Explanation
B) Local Interpretable Model-Agnostic Explanations
C) Lightweight Integrated Model Evaluation
D) Layered Importance Mapping Engine
Answer: B
Explanation: LIME explains predictions locally with interpretable surrogate models.
Q143. Grad-CAM is used for:
A) Text classification explanation
B) Visualizing which image regions influenced CNN predictions
C) Feature selection
D) Hyperparameter tuning
Answer: B
Explanation: Grad-CAM highlights important image regions for CNN predictions.
Q144. Explainable AI (XAI) aims to:
A) Make models faster
B) Make ML model decisions understandable to humans
C) Reduce training data requirements
D) Increase model complexity
Answer: B
Explanation: XAI makes model decisions interpretable and trustworthy.
Q145. Algorithmic bias in ML refers to:
A) Slow training algorithms
B) Systematic unfair discrimination in model predictions due to biased training data
C) Random errors in predictions
D) Using too many features
Answer: B
Explanation: Algorithmic bias creates systematically unfair outcomes.
Q146. Model robustness refers to:
A) Training speed
B) The model's ability to perform consistently under noisy inputs or distribution shifts
C) Number of parameters
D) Interpretability
Answer: B
Explanation: Robust models maintain performance under noisy or shifted inputs.
Q147. Which format is commonly used to save scikit-learn models?
A) CSV
B) JSON
C) Pickle (.pkl)
D) PNG
Answer: C
Explanation: Pickle serializes scikit-learn model objects.
Q148. Flask is used in ML deployment for:
A) Training models
B) Building lightweight web APIs to serve model predictions
C) Data preprocessing
D) Visualizing results
Answer: B
Explanation: Flask can create REST APIs for serving predictions.
Q149. FastAPI compared to Flask for ML APIs is:
A) Slower
B) Faster with automatic data validation and OpenAPI docs
C) Only for databases
D) Not suitable for ML
Answer: B
Explanation: FastAPI is fast and provides validation and API docs.
Q150. Model drift refers to:
A) Model parameters changing during inference
B) Degradation of model performance over time as real-world data distribution changes
C) Increasing model size
D) Adding more layers
Answer: B
Explanation: Model drift occurs when production data patterns change.
Q151. The principle of fairness in ML requires:
A) Using all available features
B) Ensuring equitable treatment across demographic groups
C) Maximizing accuracy only
D) Using the most complex model
Answer: B
Explanation: Fair ML avoids systematic disadvantage to protected groups.
Q152. SHAP values are based on concepts from:
A) Information theory
B) Cooperative game theory (Shapley values)
C) Graph theory
D) Bayesian statistics
Answer: B
Explanation: SHAP is based on Shapley values from game theory.
Q153. Which technique creates a local linear surrogate model to explain a single prediction?
A) SHAP
B) LIME
C) Grad-CAM
D) PCA
Answer: B
Explanation: LIME fits a local interpretable model around one prediction.
Q154. A REST API for ML typically accepts input as:
A) Python objects directly
B) Serialized data in JSON format via HTTP requests
C) Pickle files only
D) CSV files only
Answer: B
Explanation: REST APIs usually exchange JSON over HTTP.
Q155. Model reliability in production requires:
A) Only achieving high training accuracy
B) Continuous monitoring, testing, and maintenance of model performance
C) Using the most complex model
D) Never retraining the model
Answer: B
Explanation: Production ML needs ongoing monitoring and maintenance.
Q156. GDPR (in the context of ML ethics) requires:
A) All models to use deep learning
B) Transparency and right to explanation for automated decisions affecting individuals
C) Models to be 100% accurate
D) Open-source code
Answer: B
Explanation: GDPR includes transparency and explanation rights for automated decisions.
Q157. Adversarial robustness refers to:
A) Training on adversarial examples
B) Model's resistance to deliberately crafted inputs designed to cause misclassification
C) Using stronger hardware
D) Ensemble methods
Answer: B
Explanation: Adversarial robustness resists inputs designed to fool the model.
Q158. Which deployment approach serves predictions in real-time for individual requests?
A) Batch inference
B) Online (real-time) inference
C) Offline scoring
D) Periodic retraining
Answer: B
Explanation: Online inference processes individual requests immediately.
Q159. Containerization (e.g., Docker) in ML deployment helps by:
A) Training faster
B) Packaging the model and its dependencies into a portable, reproducible environment
C) Reducing model size
D) Replacing the model
Answer: B
Explanation: Docker bundles code, model, and dependencies consistently.
Q160. Feature importance differs from SHAP in that feature importance:
A) Is always more accurate
B) Shows global average contribution while SHAP shows per-prediction contributions
C) Only works for linear models
D) Cannot be computed for tree models
Answer: B
Explanation: Feature importance is global; SHAP can explain individual predictions.
Q161. An Autoencoder consists of:
A) Only an encoder
B) Only a decoder
C) An encoder that compresses data and a decoder that reconstructs it
D) Multiple classifiers
Answer: C
Explanation: Autoencoders compress data and reconstruct it with encoder-decoder structure.
Q162. VAE stands for:
A) Variable Autoencoder
B) Variational Autoencoder
C) Vector-Augmented Encoder
D) Visual Attention Encoder
Answer: B
Explanation: VAE means Variational Autoencoder.
Q163. GAN stands for:
A) Gradient Aggregation Network
B) Generative Adversarial Network
C) General Autoregressive Node
D) Gated Activation Neuron
Answer: B
Explanation: GAN trains generator and discriminator in competition.
Q164. In a GAN, the discriminator's role is to:
A) Generate new data samples
B) Distinguish real samples from generated (fake) samples
C) Encode data to latent space
D) Classify input images
Answer: B
Explanation: The discriminator tells real samples from fake generated samples.
Q165. In a GAN, the generator's role is to:
A) Classify real vs fake
B) Generate realistic data samples that fool the discriminator
C) Encode latent representations
D) Cluster data
Answer: B
Explanation: The generator creates synthetic samples intended to fool the discriminator.
Q166. Diffusion models generate images by:
A) Training a GAN
B) Iteratively denoising data from pure noise to generate samples
C) Using variational autoencoders only
D) Running k-Means on pixel space
Answer: B
Explanation: Diffusion models learn to reverse a noising process.
Q167. LLM stands for:
A) Linear Learning Model
B) Large Language Model
C) Layered Linguistic Mechanism
D) Low-Latency Machine
Answer: B
Explanation: LLM means Large Language Model.
Q168. Prompt engineering refers to:
A) Building hardware for AI
B) Crafting effective input prompts to guide LLM outputs
C) Training LLMs from scratch
D) Compressing models
Answer: B
Explanation: Prompt engineering designs inputs to guide LLM behavior.
Q169. AutoML automates:
A) Data collection
B) Model selection, hyperparameter tuning, and pipeline optimization
C) Model deployment only
D) Data labeling
Answer: B
Explanation: AutoML automates model and pipeline selection and tuning.
Q170. Edge AI refers to:
A) AI running only in data centers
B) AI inference running on edge devices (phones, IoT) rather than cloud servers
C) AI for stock market edge
D) AI using edge detection algorithms
Answer: B
Explanation: Edge AI runs inference on local devices.
Q171. TinyML focuses on:
A) Training very large models
B) Deploying ML models on resource-constrained microcontrollers and embedded systems
C) Cloud-scale ML
D) Data augmentation techniques
Answer: B
Explanation: TinyML optimizes models for very small devices.
Q172. The Transformer architecture uses which mechanism as its core?
A) Convolution
B) Recurrence
C) Self-Attention
D) Pooling
Answer: C
Explanation: Transformers rely on self-attention.
Q173. Mode collapse in GANs refers to:
A) The model stopping training
B) The generator producing only a few types of outputs instead of diverse samples
C) The discriminator always winning
D) Overfitting on training data
Answer: B
Explanation: Mode collapse means the generator produces limited output variety.
Q174. GPT models use which architecture?
A) CNN
B) LSTM
C) Transformer (decoder-only)
D) Autoencoder
Answer: C
Explanation: GPT uses a decoder-only Transformer.
Q175. Fine-tuning an LLM means:
A) Training from scratch on new data
B) Updating a pretrained LLM on a specific task dataset
C) Only changing prompt structure
D) Deploying the model
Answer: B
Explanation: Fine-tuning adapts a pretrained model to task-specific data.
Q176. RAG (Retrieval-Augmented Generation) enhances LLMs by:
A) Adding more layers
B) Retrieving relevant external documents to provide context during generation
C) Training on bigger datasets
D) Using RNNs instead
Answer: B
Explanation: RAG grounds generation using retrieved documents.
Q177. Quantization in TinyML refers to:
A) Adding more neurons
B) Reducing numerical precision (e.g., 32-bit to 8-bit) to shrink model size
C) Increasing training data
D) Using quantum computers
Answer: B
Explanation: Quantization reduces weight precision to shrink and speed models.
Q178. Reinforcement Learning's key components include:
A) Encoder and Decoder
B) Agent, Environment, State, Action, and Reward
C) Generator and Discriminator
D) Encoder, Bottleneck, and Decoder
Answer: B
Explanation: RL includes an agent, environment, states, actions, and rewards.
Q179. Stable Diffusion and DALL-E are examples of:
A) Text classifiers
B) Image generation diffusion/generative models
C) Tabular data models
D) Reinforcement learning agents
Answer: B
Explanation: Stable Diffusion and DALL-E are text-to-image generative models.
Q180. The latent space in a VAE is:
A) The output layer
B) A continuous probabilistic space where similar data points are close together
C) The input layer
D) The attention matrix
Answer: B
Explanation: VAE latent space is continuous and probabilistic.
Q181. Zero-shot learning in LLMs means:
A) Training on zero data
B) The model performs a task it was never explicitly trained on, using only a prompt description
C) Using 0 layers
D) Training with no labels
Answer: B
Explanation: Zero-shot means the model performs a task from only a prompt description.
`;

function getUnitName(id) {
  return UNIT_BY_RANGE.find((unit) => id <= unit.max)?.name ?? 'CAP555 - Machine Learning Using Python';
}

function parseQuestions(rawQuestions) {
  const questionPattern =
    /Q(\d+)\.\s*([\s\S]*?)\nA\)\s*([\s\S]*?)\nB\)\s*([\s\S]*?)\nC\)\s*([\s\S]*?)\nD\)\s*([\s\S]*?)\nAnswer:\s*([A-D])\s*\nExplanation:\s*([\s\S]*?)(?=\nQ\d+\.|\s*$)/g;

  return Array.from(rawQuestions.matchAll(questionPattern), (match) => {
    const id = Number(match[1]);
    return {
      id,
      unit: getUnitName(id),
      question: match[2].replace(/\s+/g, ' ').trim(),
      options: ['A', 'B', 'C', 'D'].map((label, index) => ({
        label,
        text: match[index + 3].replace(/\s+/g, ' ').trim(),
      })),
      answer: match[7],
      solution: match[8].replace(/\s+/g, ' ').trim(),
    };
  });
}

export const MACHINE_LEARNING_PYTHON_EXPECTED_COUNT = 181;

export const machineLearningPythonQuestions = parseQuestions(rawMachineLearningQuestions);
