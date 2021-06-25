var startedArray = []

let addCartBtn = document.querySelectorAll('#addBtn')

addCartBtn.forEach((e)=>{
 
    e.addEventListener('click' ,async (event)=>{
    
    let main =  event.target.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes
    
    let productImgSrc = main[1].childNodes[1].childNodes[0].src
    let productName = main[3].childNodes[1].innerText 
    let productCost = main[3].childNodes[3].childNodes[1].innerText
    
    productCost = productCost.slice(1 , productCost.length - 3)
    
    startedArray.push({
    	id: startedArray.length + 1,
    	name: productName,
    	cost: productCost,
        imgSrc: productImgSrc,
    })
  
     setInterval(()=>{
   document.cookie = (`selledProduction=${JSON.stringify(startedArray)}`)
    } , 100)
  
  })

})



