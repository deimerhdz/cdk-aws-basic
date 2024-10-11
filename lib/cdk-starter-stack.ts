import * as cdk from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
class L3BUcket extends Construct {
  constructor(scope: Construct, id: string,expiration:number){
    super(scope,id)
    new Bucket(this,id,{
      lifecycleRules:[{
        expiration:cdk.Duration.days(expiration)
      }]
    })
  }
}
export class CdkStarterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
// create an s3 bucket 3 ways 
    // L1
    new CfnBucket(this,'startterBucketL1',{
      lifecycleConfiguration:{
        rules:[{
          expirationInDays:1,
          status:'Enabled'
        }]
      }
    })
    const duration = new cdk.CfnParameter(this,'duration',{
      default:6,
      minValue:1,
      maxValue:10,
      type:'Number'
    })
    //L2
    const myL2Bucket = new Bucket(this,'starterBucketL2',{
      lifecycleRules:[{
        expiration:cdk.Duration.days(duration.valueAsNumber)
      }]
    })
    
    //L3
    new L3BUcket(this,'starterBucketL3',3)

    new cdk.CfnOutput(this,'MyL2BucketName',{
      value:myL2Bucket.bucketName
    })
  }
}
