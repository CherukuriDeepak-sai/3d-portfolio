export interface CaseStudyFigure {
  src: string
  alt: string
  caption: string
  width: number
  height: number
  group: string
}

interface CaseStudyBase {
  slug: string
  title: string
  shortTitle: string
  course: string
  module: string
  summary: string
  role: string
  tools: string[]
}

export interface VisionCaseStudy extends CaseStudyBase {
  kind: 'vision'
  reportTitle: string
  context: string
  classes: string[]
  datasetNotes: string[]
  split: { label: string; value: string }[]
  preprocessing: string[]
  augmentation: string[]
  inputPipeline: string[]
  models: { name: string; parameters: string; design: string; accuracy: string; loss?: string }[]
  trainingNotes: string[]
  matrixFindings: string[]
  classificationNotes: string[]
  rocNotes: string[]
  strengths: string[]
  limitations: string[]
  futureWork: string[]
  figures: CaseStudyFigure[]
  references: string[]
}

export interface CloudCaseStudy extends CaseStudyBase {
  kind: 'cloud'
  projectPlan: { phase: string; duration: string }[]
  requirements: { id: string; type: string; description: string; awsMapping: string }[]
  regionNotes: string[]
  architectureLayers: { layer: string; services: string; responsibility: string }[]
  architectureFlow: string[]
  services: { name: string; purpose: string; projectEvidence: string }[]
  costEstimate: { label: string; amount: string }[]
  costNotes: string[]
  reflection: string[]
  reportNotes: string[]
  figures: CaseStudyFigure[]
  references: string[]
}

export type CaseStudy = VisionCaseStudy | CloudCaseStudy

export const caseStudies: readonly CaseStudy[] = [
  {
    slug: 'natural-image-machine-vision',
    kind: 'vision',
    title: 'Comparing deep-learning models for Natural Images',
    shortTitle: 'Natural Images classification',
    course: 'MSc Computer Science · University of East London',
    module: 'Artificial Intelligence & Machine Vision · CN7023',
    reportTitle: 'Comparative Analysis of Deep Learning Models for Multi-Class Image Classification Using Transfer Learning',
    summary: 'A coursework study comparing a custom convolutional neural network with ResNet50 and DenseNet121 for eight-class image classification.',
    role: 'Coursework project: dataset preparation, model implementation, comparison and evaluation.',
    tools: ['Python', 'TensorFlow', 'tf.data', 'CNN', 'ResNet50', 'DenseNet121', 'Transfer learning'],
    context: 'The report frames image classification as useful in areas such as medical diagnosis, autonomous driving, surveillance and smart retail. This project tests model performance on the Natural Images dataset; it does not claim deployment in those settings.',
    classes: ['Airplane', 'Car', 'Cat', 'Dog', 'Flower', 'Fruit', 'Motorbike', 'Person'],
    datasetNotes: [
      'The report describes the cleaned dataset as relatively balanced, with roughly 700–1,000 images in each of eight classes.',
      'Fruit and person have the largest class counts; dog and airplane have slightly fewer samples.',
      'Corrupted or irrelevant images were removed. Minor class-count differences were handled through augmentation rather than a separate re-sampling method.',
    ],
    split: [
      { label: 'Training', value: '70%' },
      { label: 'Validation', value: '15%' },
      { label: 'Test', value: '15%' },
    ],
    preprocessing: [
      'Resize each image to 128 × 128 pixels.',
      'Rescale pixel values by 1/255.',
      'Remove corrupted or irrelevant images before training.',
    ],
    augmentation: [
      'Random horizontal and vertical flips.',
      'Rotation (the report specifies “up to 15 percent”).',
      'Zoom and contrast adjustments.',
    ],
    inputPipeline: [
      'Use TensorFlow’s tf.data API and image_dataset_from_directory to load images, infer labels from folders and batch examples.',
      'Cache, shuffle and prefetch the data pipeline to reduce input bottlenecks.',
    ],
    models: [
      {
        name: 'Custom CNN',
        parameters: 'Approximately 458,000',
        design: 'Multiple convolutional layers with batch normalization and ReLU, max pooling, global average pooling, and dense/dropout layers. This is the project’s custom baseline.',
        accuracy: '83.80%',
      },
      {
        name: 'ResNet50',
        parameters: 'More than 23 million',
        design: 'Pre-trained residual network using skip connections. The base was frozen as a feature extractor; the classification head used global average pooling and dropout.',
        accuracy: '99.81%',
        loss: '0.0089 (reported test loss)',
      },
      {
        name: 'DenseNet121',
        parameters: 'Approximately 7 million',
        design: 'Pre-trained densely connected network focused on feature reuse and gradient flow. The base was frozen and only the classification head was trained.',
        accuracy: '99.14%',
      },
    ],
    trainingNotes: [
      'The custom CNN training plot shows training and validation accuracy improving while loss falls; validation performance fluctuates, indicating some overfitting.',
      'Early stopping and learning-rate reduction callbacks were used to stabilize training and limit overfitting.',
      'The report describes ResNet50 and DenseNet121 as converging more quickly and with steadier validation performance than the custom CNN.',
    ],
    matrixFindings: [
      'For the custom CNN, the report highlights 156 correctly classified fruit images, 141 cars and 135 people.',
      'The custom CNN correctly classified 83 cat images and confused 41 cats with dogs; it correctly classified 88 dogs and confused 35 with cats.',
      'The report also notes 26 airplane/motorbike confusions in the custom CNN matrix.',
      'The supplied report includes separate confusion matrices for the custom CNN, ResNet50 and DenseNet121; all three are shown below.',
    ],
    classificationNotes: [
      'The custom CNN classification report shows 84% overall accuracy (rounded), 0.82 macro-average F1 and 0.84 weighted-average F1.',
      'Fruit achieved precision 0.99 and recall 1.00; car achieved precision 0.94 and recall 1.00.',
      'Cat and dog each had an F1 score of 0.63, reflecting the visually similar categories noted in the report.',
    ],
    rocNotes: [
      'The report describes one-versus-rest ROC curves with AUC values close to 1.00 for fruit, car and person.',
      'Cat and dog are reported at approximately 0.95–0.97 AUC; the reported micro-average curve is close to 1.00.',
    ],
    strengths: [
      'Compared three architectures using the same dataset and test split.',
      'Combined image cleaning, normalization, augmentation and a cached/shuffled/prefetched input pipeline.',
      'Reported markedly higher test accuracy for both transfer-learning models than for the custom CNN.',
    ],
    limitations: [
      'The custom CNN struggled with similar-looking cats and dogs.',
      'The report notes that the dataset may be relatively simple and may not represent the full range of real-world images.',
      'The pre-trained model layers were frozen rather than fine-tuned; the report recommends more rigorous cross-validation and external-data testing.',
    ],
    futureWork: [
      'Fine-tune the pre-trained models and evaluate on larger, more varied datasets.',
      'Explore attention mechanisms or ensemble learning.',
      'Use cross-validation and external test data to assess generalization beyond this dataset.',
    ],
    figures: [
      { src: '/case-studies/natural-images/class-distribution.webp', alt: 'Bar chart of the eight Natural Images classes after corrupted images were removed; the counts are broadly similar, with fruit and person higher and dog and airplane lower.', caption: 'Class distribution after removing corrupted images (report Figure 3.1).', width: 786, height: 377, group: 'Dataset' },
      { src: '/case-studies/natural-images/dataset-examples.webp', alt: 'Example images from the dataset, including fruit, flowers, cats, dogs and motorbikes, with varied objects, backgrounds and lighting.', caption: 'Example dataset images (report Figure 3.2).', width: 813, height: 437, group: 'Dataset' },
      { src: '/case-studies/natural-images/custom-cnn-model.webp', alt: 'Custom convolutional neural network model summary, with convolution, batch-normalization, pooling and dense layers.', caption: 'Custom CNN architecture summary (report Figure 3.3).', width: 321, height: 497, group: 'Model architectures' },
      { src: '/case-studies/natural-images/resnet50-model.webp', alt: 'ResNet50 transfer-learning model summary with a frozen feature extractor and trainable classification head.', caption: 'ResNet50 model summary (report Figure 3.4).', width: 559, height: 322, group: 'Model architectures' },
      { src: '/case-studies/natural-images/densenet121-model.webp', alt: 'DenseNet121 transfer-learning model summary with a frozen base and trainable classification head.', caption: 'DenseNet121 model summary (report Figure 3.5).', width: 488, height: 321, group: 'Model architectures' },
      { src: '/case-studies/natural-images/training-history.webp', alt: 'Training and validation history for the custom CNN, showing accuracy and loss across training epochs.', caption: 'Custom CNN training history (report Figure 3.6).', width: 590, height: 628, group: 'Training' },
      { src: '/case-studies/natural-images/accuracy-loss-curves.webp', alt: 'Training and validation accuracy and loss curves comparing the custom CNN, ResNet50 and DenseNet121.', caption: 'Accuracy and loss curves for all three models (report Figure 4.1).', width: 407, height: 491, group: 'Results and evaluation' },
      { src: '/case-studies/natural-images/custom-cnn-confusion-matrix.webp', alt: 'Eight-class confusion matrix for the custom CNN, with true labels by row and predicted labels by column.', caption: 'Custom CNN confusion matrix (report Figure 4.2).', width: 713, height: 644, group: 'Results and evaluation' },
      { src: '/case-studies/natural-images/resnet50-confusion-matrix.webp', alt: 'Eight-class confusion matrix for ResNet50, with true labels by row and predicted labels by column.', caption: 'ResNet50 confusion matrix (report Figure 4.3).', width: 713, height: 644, group: 'Results and evaluation' },
      { src: '/case-studies/natural-images/densenet121-confusion-matrix.webp', alt: 'Eight-class confusion matrix for DenseNet121, with true labels by row and predicted labels by column.', caption: 'DenseNet121 confusion matrix (report Figure 4.4).', width: 713, height: 644, group: 'Results and evaluation' },
      { src: '/case-studies/natural-images/custom-cnn-classification-report.webp', alt: 'Classification report for the custom CNN, showing precision, recall, F1 score and support for each image class.', caption: 'Custom CNN classification report (report Figure 4.3 in the evaluation section).', width: 334, height: 197, group: 'Results and evaluation' },
      { src: '/case-studies/natural-images/test-accuracy-comparison.webp', alt: 'Test accuracy comparison: custom CNN 83.80%, ResNet50 99.81% and DenseNet121 99.14%.', caption: 'Test-set model comparison (report Figure 4.4 in the results section).', width: 534, height: 317, group: 'Results and evaluation' },
      { src: '/case-studies/natural-images/roc-curves.webp', alt: 'One-versus-rest ROC curves for image classes, with strong class discrimination and lower AUC for the similar cat and dog classes.', caption: 'One-versus-rest ROC curves (report Figure 4.5).', width: 500, height: 413, group: 'Results and evaluation' },
    ],
    references: [
      'Zaidi et al. (2025), “Unsupervised classification of multi-class chart images: a comparison of customized CNNs and transfer learning techniques,” PeerJ Computer Science, 11, e3148.',
      'Alharthi, Alaryani and Kaddoura (2025), “A comparative study of machine learning and deep learning models in binary and multiclass classification for intrusion detection systems,” Array, 26, 100406.',
      'Raju and Rao (2022), “Colorectal multi-class image classification using deep learning models,” Bulletin of Electrical Engineering and Informatics, 11(1), 195–200.',
      'Škvorc, Eftimov and Korošec (2022), “Transfer learning analysis of multi-class classification for landscape-aware algorithm selection,” Mathematics, 10(3), 432.',
      'Deepak and Bhat (2024), “Deep learning-based CNN for multiclassification of ocular diseases using transfer learning,” Computer Methods in Biomechanics and Biomedical Engineering: Imaging & Visualization, 12(1), 2335959.',
      'Rayhan and Pratama Rifai (2024), “Multi-class waste classification using convolutional neural network,” Applied Environmental Research, 46(2).',
    ],
  },
  {
    slug: 'aws-warehouse-architecture',
    kind: 'cloud',
    title: 'Warehouse automation cloud architecture',
    shortTitle: 'AWS warehouse architecture',
    course: 'Cloud Computing · University of East London',
    module: 'CN7026 · Term 2026/27',
    summary: 'An academic design for a scalable warehouse inventory workflow using AWS networking, compute, event processing, storage, monitoring and access-control services.',
    role: 'Coursework project: requirements gathering, architecture design, AWS configuration exploration and cost estimation.',
    tools: ['AWS', 'VPC', 'EC2', 'Lambda', 'RDS PostgreSQL', 'S3', 'DynamoDB', 'SQS', 'CloudWatch', 'IAM', 'SNS'],
    projectPlan: [
      { phase: 'Problem identification', duration: '1 day' },
      { phase: 'Requirements gathering', duration: '1 day' },
      { phase: 'Project planning', duration: '1 day' },
      { phase: 'System design', duration: '2 days' },
      { phase: 'Data-centre design', duration: '1 day' },
      { phase: 'Cloud architecture design', duration: '2 days' },
      { phase: 'VPC setup', duration: '1 day' },
      { phase: 'EC2 setup', duration: '1 day' },
      { phase: 'RDS setup', duration: '1 day' },
      { phase: 'S3 setup', duration: '1 day' },
      { phase: 'Load balancer and Auto Scaling setup', duration: '1 day' },
      { phase: 'CloudWatch setup', duration: '1 day' },
      { phase: 'Lambda and SNS setup', duration: '1 day' },
      { phase: 'Testing and cost estimation', duration: '2 days' },
    ],
    requirements: [
      { id: 'FR1', type: 'Functional', description: 'Support real-time inventory updates.', awsMapping: 'AWS Lambda' },
      { id: 'FR2', type: 'Functional', description: 'Provide data storage and retrieval.', awsMapping: 'Amazon RDS' },
      { id: 'FR3', type: 'Functional', description: 'Provide user authentication and access control.', awsMapping: 'AWS IAM' },
      { id: 'FR4', type: 'Functional', description: 'Generate alerts for low stock and system issues.', awsMapping: 'SNS / CloudWatch' },
      { id: 'NFR1', type: 'Non-functional', description: 'Scale to increasing data loads.', awsMapping: 'Auto Scaling' },
      { id: 'NFR2', type: 'Non-functional', description: 'Protect data with encryption and access control.', awsMapping: 'IAM / KMS' },
      { id: 'NFR3', type: 'Non-functional', description: 'Maintain high availability across regions (as stated in the report).', awsMapping: 'Multi-AZ (the report’s mapping)' },
      { id: 'NFR4', type: 'Non-functional', description: 'Keep response latency low.', awsMapping: 'DynamoDB / optimized queries' },
    ],
    regionNotes: [
      'The report selects the AWS Northern Virginia region (us-east-1).',
      'It proposes multiple Availability Zones, citing availability and redundant power/networking as the reasons for the selection.',
      'The report describes a multi-layer cloud data centre as a way to separate workloads and reduce dependence on physical infrastructure.',
    ],
    architectureLayers: [
      { layer: 'Presentation', services: 'EC2', responsibility: 'Serve the warehouse application and receive requests from users and devices.' },
      { layer: 'Application', services: 'AWS Lambda', responsibility: 'Process inventory events with an event-driven, serverless workflow.' },
      { layer: 'Data', services: 'Amazon RDS and Amazon S3', responsibility: 'Store transactional inventory records, logs, documents and other objects.' },
      { layer: 'Supporting services', services: 'DynamoDB, SQS, CloudWatch, IAM, SNS, API Gateway, load balancing and Auto Scaling', responsibility: 'Support fast data access, queued messages, monitoring, access control, alerts and planned scaling.' },
    ],
    architectureFlow: [
      'Warehouse users, scanners, sensors and applications connect through the internet or an API Gateway.',
      'Traffic enters the VPC, which separates public and private subnets; the design places EC2 application instances in a public subnet.',
      'Lambda processes warehouse data events. SQS queues can isolate work, while DynamoDB is listed for efficient data access.',
      'RDS for PostgreSQL stores structured inventory transactions; S3 stores objects such as logs and documents.',
      'CloudWatch collects logs and metrics; IAM roles and policies govern service access. SNS is included in the plan for alerts.',
    ],
    services: [
      { name: 'IAM', purpose: 'Manage users, roles and policies for controlled AWS service access.', projectEvidence: 'The report records authorization errors and an unavailable account alias early in setup; it identifies correct role and policy configuration as a key dependency.' },
      { name: 'VPC', purpose: 'Separate network traffic with a virtual private cloud and public/private subnets.', projectEvidence: 'VPC and subnet setup was explored. The report notes an IAM permission error during configuration.' },
      { name: 'EC2', purpose: 'Host application services on virtual instances in the public subnet.', projectEvidence: 'The report discusses network traffic, key pairs and security groups; it also records permission-related deployment challenges.' },
      { name: 'S3', purpose: 'Store logs, documents and other objects with bucket-level access controls.', projectEvidence: 'The report describes choosing a bucket type and unique name, then configuring access controls.' },
      { name: 'RDS for PostgreSQL', purpose: 'Store structured warehouse records and transactional inventory updates.', projectEvidence: 'Database creation was blocked by an IAM permission error during configuration.' },
      { name: 'Lambda', purpose: 'Process warehouse data events without managing a server for each function.', projectEvidence: 'The report covers function runtime/settings and event-driven processing as part of the planned system.' },
      { name: 'CloudWatch', purpose: 'Collect logs and metrics and support monitoring and alerts.', projectEvidence: 'The report describes monitoring service and application behaviour and using alerts to help identify issues.' },
      { name: 'SNS, SQS, DynamoDB, API Gateway, load balancing and Auto Scaling', purpose: 'Alerts, message queuing, fast data access, request entry and planned traffic scaling.', projectEvidence: 'These services appear in the requirements, architecture narrative or project plan; the report does not establish a production deployment.' },
    ],
    costEstimate: [
      { label: 'Upfront estimate', amount: '$0.00 USD' },
      { label: 'Monthly estimate', amount: '$0.00 USD' },
      { label: 'Estimated 12-month total', amount: '$0.00 USD' },
    ],
    costNotes: [
      'The report’s AWS estimate assumes the listed configuration falls within AWS free usage. It is a coursework estimate, not an invoice or a verified cost for a running system.',
      'The report describes a pay-as-you-go model and aims to avoid upfront hardware purchases; actual charges depend on configuration, usage and eligibility.',
    ],
    reflection: [
      'The project aims to support scalable, near-real-time inventory processing and automated warehouse tasks without purchasing on-premises hardware.',
      'IAM permissions and service-configuration issues were encountered during early setup, including problems creating/configuring resources. The report emphasizes role and policy planning as a practical lesson.',
      'Proposed next steps include automated resource scaling and predictive analytics for decision support.',
      'The report refers to AWS’s shared-responsibility model as part of maintaining a secure and reliable cloud system.',
    ],
    reportNotes: [
      'This is an academic architecture and configuration project. The report documents design choices and AWS setup attempts, including permission errors; it does not claim a completed production deployment or measured operational outcome.',
      'The written requirements call for availability “across regions” but map that to Multi-AZ, while the design narrative specifies multiple Availability Zones within us-east-1. These are preserved as separate statements from the report.',
      'The report’s Gantt graphic does not match the durations in its written project-plan list. The phase table below transcribes the written list, which totals 17 planned days.',
    ],
    figures: [
      { src: '/case-studies/aws-warehouse/architecture.webp', alt: 'AWS warehouse architecture diagram showing warehouse devices entering a VPC with public and private subnets, EC2, Lambda, RDS, S3, queueing, monitoring and access-control services.', caption: 'Proposed AWS cloud architecture (report Figure 2).', width: 945, height: 572, group: 'Architecture' },
      { src: '/case-studies/aws-warehouse/cost-summary.webp', alt: 'AWS estimate summary from the report showing 0.00 US dollars upfront, 0.00 US dollars monthly and 0.00 US dollars for the 12-month estimate.', caption: 'AWS estimate summary as recorded in the coursework (report Figure 10).', width: 779, height: 185, group: 'Cost estimate' },
      { src: '/case-studies/aws-warehouse/cost-line-items.webp', alt: 'AWS estimate line items for VPC, EC2, Lambda, S3, RDS, IAM Access Analyzer and CloudWatch in US East (Northern Virginia), each showing zero upfront and monthly cost in the report estimate.', caption: 'AWS cost line items shown in the report estimate.', width: 1255, height: 403, group: 'Cost estimate' },
    ],
    references: [
      'Alobaywi, Almutairi and Sheldon (2026), “Performance Trade-Offs in Multi-Tenant IoT–Cloud Security: A Systematic Review of Emerging Technologies,” IoT, 7(1), 21.',
      'Ayoola et al. (2024), “IoT-driven smart warehouses with computer vision for enhancing inventory accuracy and reducing discrepancies in automated systems,” IRE Journals, 8(5), 176–210.',
      'Katal, Dahiya and Choudhury (2023), “Energy efficiency in cloud computing data centers: a survey on software technologies,” Cluster Computing, 26(3), 1845–1875.',
      'Komar, Patil and Ali (2023), “Emerging Trends in Cloud Computing: A Comprehensive Analysis of Deployment Models and Service Models for Scalability, Flexibility, and Security Enhancements,” Journal of Intelligent Systems and Applied Data Science, 1(1).',
      'López (2025), “Cloud computing as an industry 5.0 enabling technology,” Ingeniería e Investigación, 45(2), 5.',
    ],
  },
]

export const visionCaseStudy = caseStudies.find((study): study is VisionCaseStudy => study.kind === 'vision')!
export const cloudCaseStudy = caseStudies.find((study): study is CloudCaseStudy => study.kind === 'cloud')!
