`kubectl apply -f` everything in this order:

1. `configmap.yaml`
1. `pv.yaml`
1. `statefulset.yaml`
1. `statefulset_svc.yaml`
1. `replicaset.yaml`
1. `replicaset_svc.yaml`
1. `ingress.yaml`