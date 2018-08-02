function preprocess(img)
{

    //convert the image data to a tensor 
    let tensor = tf.fromPixels(img)
    //resize to 50 X 50
    const resized = tf.image.resizeBilinear(tensor, [50, 50]).toFloat()
    // Normalize the image 
    const offset = tf.scalar(255.0);
    const normalized = tf.scalar(1.0).sub(resized.div(offset));
    //We add a dimension to get a batch shape 
    const batched = normalized.expandDims(0)
    return batched

}
/*
get the prediction 
*/
function predict(imgData) {
        
      
        //get the prediction 
        const pred = model.predict(preprocess(imgData)).dataSync()
                    
        //retreive the highest probability class label 
        const idx = pred.argMax();
                
        //find the predictions 
        const indices = findIndicesOfMax(pred, 1)
        const probs = findTopValues(pred, 1)
        const names = getClassNames(indices) 
        //set the table 
        //setTable(names, probs) 
        document.getElementById("Result").innerHTML = names
        document.getElementById("Probability").innerHTML = probs
    
  }

async function start(){
	//img = document.getElementById('image').files[0];
	
        
        model = await tf.loadModel('model/model.json')
        
        var status = document.getElementById('status')
      
        status.innerHTML = 'Model Loaded'
        
        //document.getElementById('status').innerHTML = 'Model Loaded';

        img = document.getElementById('list');
        predict(img)
    
        //load the class names
        await loadDict()
        }
   

					

					  