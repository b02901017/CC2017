git clone https://github.com/kubernetes/kubernetes.git
sudo kubectl create -f examples/spark/namespace-spark-cluster.yaml
sudo kubectl create -f examples/spark/spark-master-controller.yaml
sudo kubectl create -f examples/spark/spark-master-service.yaml
sudo kubectl create -f examples/spark/spark-worker-controller.yaml
sudo kubectl create -f examples/spark/zeppelin-controller.yaml