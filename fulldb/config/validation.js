$(function(){
    console.log("yaaaaaayyyyyyyyyyyyyyyyyyyyyy")

   $("#register").on('click', function(event){
       event.preventDefault();
       var uname   = $("#u").val();
       var email      = $("#e").val();
       var password   = $("#p").val();
       var cpassword  = $("#cp").val();
       var country    = $("#coun").val();

       if(!uname|| !email || !password || !cpassword || !country){
           $("#msgDiv").show().html("All fields are required.");
       } else if(cpassword != password){
           $("#msgDiv").show().html("Passwords should match.");
       }
       else{
           $.ajax({
               url: "/signup",
               method: "POST",
               data: { full_name: uname, email: email, password: password, cpassword: cpassword, country: country}
           }).done(function( data ) {
              console.log("prioooooooooooo")

               if ( data ) {
                   if(data.status == 'error'){

                       var errors = '<ul>';
                       $.each( data.message, function( key, value ) {
                           errors = errors +'<li>'+value.msg+'</li>';
                       });

                       errors = errors+ '</ul>';
                       $("#msgDiv").html(errors).show();
                   }else{
                       $("#msgDiv").removeClass('alert-danger').addClass('alert-success').html(data.message).show();
                   }
               }
           });
       }
   });
});