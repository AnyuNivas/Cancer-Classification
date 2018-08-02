
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
   

					

					  