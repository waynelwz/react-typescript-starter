import bentoml

from sklearn import svm
from sklearn import datasets

# Load predefined training set to build an example model
iris = datasets.load_iris()
X, y = iris.data, iris.target

# Model Training
clf = svm.SVC(gamma='scale')
clf.fit(X, y)

# Call to bentoml.<FRAMEWORK>.save(<MODEL_NAME>, model)
# In order to save to BentoML's standard format in a local model store
bentoml.sklearn.save("iris_clf", clf)

# [08:34:16 AM] INFO     Successfully saved Model(tag="iris_clf:svcryrt5xgafweb5",
#                        path="/home/user/bentoml/models/iris_clf/svcryrt5xgafweb5/")
# Tag(name='iris_clf', version='svcryrt5xgafweb5')