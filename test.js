var classNames = [];
var model;
/*
load the class names 
*/
async function loadDict() {
  
    loc = 'model2/class_names.txt'
    
    await $.ajax({
        url: loc,
        dataType: 'text',
    }).done(success);
}

/*
load the class names
*/
function success(data) {
    const lst = data.split(/\n/)
    for (var i = 0; i < lst.length - 1; i++) {
        let symbol = lst[i]
        classNames[i] = symbol
    }
}
/*
get the the class names 
*/
function getClassNames(indices) {
    var outp = []
    for (var i = 0; i < indices.length; i++)
        outp[i] = classNames[indices[i]]
    return outp
}
/*
find predictions
*/
function findTopValues(inp, count) {
    var outp = [];
    let indices = findIndicesOfMax(inp, count)
    // show  scores
    for (var i = 0; i < indices.length; i++)
        outp[i] = inp[indices[i]]
    return outp
}
/*
get indices of the top probs
*/
function findIndicesOfMax(inp, count) {
    var outp = [];
    for (var i = 0; i < inp.length; i++) {
        outp.push(i); // add index to output array
        if (outp.length > count) {
            outp.sort(function(a, b) {
                return inp[b] - inp[a];
            }); // descending sort the output array
            outp.pop(); // remove the last index (index of smallest element in output array)
        }
    }
    return outp;
}
function preprocess(img)
{

    const tensor = tf.fromPixels(imgData).toFloat()
    const offset = tf.scalar(255.0);
    // Normalize the image 
    const normalized = tf.scalar(1.0).sub(tensor.div(offset));
    const resized = tf.image.resizeBilinear(normalized, [50, 50])
    const sliced   = resized.slice([0, 0, 3], [50, 50, 3])
    const batched = sliced.expandDims(0)
    return batched

}
/*
get the prediction 
*/
function predict(imgData) {
        
      
        //get the prediction 
        const pred = model.predict(preprocess(imgData)).dataSync()
                    
        //retreive the highest probability class label 
        const idx = tf.argMax(pred);

                
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
	
        
        model = await tf.loadModel('model2/model.json')
        
        var status = document.getElementById('status')
      
        status.innerHTML = 'Model Loaded'
        
        //document.getElementById('status').innerHTML = 'Model Loaded';

        img = document.getElementById('list').firstElementChild.firstElementChild;
        //model.predict(tf.zeros([null,50,50,3]))
        predict(img)
    
        //load the class names
        await loadDict()
        }
   

					

					  