
/*
get the prediction 
*/
function predict(imgData) {
        tf.tidy(() => {
      
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
    });
  }

async function start(){
	img = document.getElementById('image').files[0];
	
       
        
        model = await tf.loadModel('model/model.json')
        
        var status = document.getElementById('status')
      
        status.innerHTML = 'Model Loaded'
        
        //document.getElementById('status').innerHTML = 'Model Loaded';

        
        predict(img)
    
        //load the class names
        await loadDict()
        }
   

					

					  