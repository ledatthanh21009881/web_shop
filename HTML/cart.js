/*$(document).on('click', '.btn-buy-now', function (e) {
    e.preventDefault();

    if($(this).hasClass('disable')){
      return false;
    }
    $(document).find('.btn-buy-now').addClass('disable');
    var self=$(this);
    var parent=$(this).parents('.thumbnail');
    var src=parent.find('img').attr('src');
    var cart=$(document).find('#cart-shop');
    // alert(src);

    var parTop=parent.offset().top;
    var parLeft=parent.offset().left;

    $('<img />', { 
    class: 'img-product-fly',
      src: src
    }).appendTo('body').css({
      'top' : parTop,
      'left' : parseInt(parLeft)+parseInt(parent.width()) -50
    });

    setTimeout(function(){
      $(document).find('.img-product-fly').css({
          'top' : cart.offset().top,
          'left' : cart.offset().left
          
      });

      setTimeout(function(){
        $(document).find('.img-product-fly').remove();
        var citem=parseInt(cart.find('#count-item').data('count'))+1
        swal({
  title: "Hay lắm ",
  text: "nothing",
  icon: "warning",
  buttons: true,
  dangerMode: false,
  html:true
})
.then((willDelete) => {
  if (willDelete) {
    swal("Bạn đã thêm thành công", {
      customClass:"null",
      icon: "success",
    });
  } else {
    swal("don't things change :v");
  }
});

        cart.find('#count-item').text(citem).data('count', citem);
      $(document).find('.btn-buy-now').removeClass('disable');

      },1000);
    },500);
  });











//-------------------------------------------------------------------------------------------
const btn = document.querySelectorAll("button")
btn.forEach(function(button,index){
button.addEvenListener("click",function(event){
    var btnItem = event.target
    var product = btnItem.parenElement
    var productImg = product.querySelector("img").src
    var productName = product.querySelector("H1").innerText
    console.log(productPrice,productImg,productName)
    addcart(productPrice,productImg,productName)
})

})

function addcart(productPrice,productImg,productName){
    var addtr = document.createElement("tr")    
    var trcontent = 'productName'
    addtr.innerHTML = trcontent
    var cartTable = document.querySelector("tbody")
    //
    cartTable.append(addtr)
    carttotal()
}


function carttotal(){
    var cartItem = document.querySelectorAll('tbody tr')
    var totalC = 0

    for (var i = 0 ; i<cartItem.length; i++){
        var inputValue = cartItem[i].querySelector("input").value

        var productPrice = cartItem[i].querySelector("span"),innerHTML

        totalA =inputValue*productPrice*1000
        totalB = totalA.toLocaleString('de-DE')
        console.log(totalB)
        totalC = totalC+totalB
        console.log(totalC)
    }


} */







//------------------------------------------------------------------------
let list = document.querySelectorAll('.list .item');
list.forEach(item => {
    item.addEventListener('click', function(event){
        if(event.target.classList.contains('add')){
            var itemNew = item.cloneNode(true);
            let checkIsset  = false;

            let listCart = document.querySelectorAll('.cart .item');
            listCart.forEach(cart =>{
                if(cart.getAttribute('data-key') == itemNew.getAttribute('data-key')){
                    checkIsset = true;
                    cart.classList.add('danger');
                    setTimeout(function(){
                        cart.classList.remove('danger');
                    },1000)
                }
            })
            if(checkIsset == false){
                document.querySelector('.listCart').appendChild(itemNew);
            }

        }
    })
})
function Remove($key){
    let listCart = document.querySelectorAll('.cart .item');
    listCart.forEach(item => {
        if(item.getAttribute('data-key') == $key){
            item.remove();
            return;
        }
    })
}