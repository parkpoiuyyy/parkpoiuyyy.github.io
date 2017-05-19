$(document).ready(function() {

    //initialize firebase
    const config={
    	    apiKey: "AIzaSyA1pmhjx3VOwaPwZ1ZWxAAspb9HNlOmQbA",
    	    authDomain: "portfolio-2bbe6.firebaseapp.com",
    	    databaseURL: "https://portfolio-2bbe6.firebaseio.com",
    	    projectId: "portfolio-2bbe6",
    	    storageBucket: "portfolio-2bbe6.appspot.com",
    	    messagingSenderId: "379948564110"
    };
    firebase.initializeApp(config);
    
    var counterPath = firebase.database().ref();
    counterPath.once('value').then(function(snapshot) {
      var counter = snapshot.val().portCounter+1;
      firebase.database().ref().set({
            portCounter : counter
      });
   
    });    
    
    
	$(document).on('click',"#google",function(){
		console.log("Seen");
	       var provider = new firebase.auth.GoogleAuthProvider();
	       firebase.auth().signInWithPopup(provider).then(function(result) {
	       // This gives you a Google Access Token. You can use it to access the Google API.
	       var token = result.credential.accessToken;
	       // The signed-in user info.
	       var user = result.user;
	       // ...
	    }).catch(function(error) {
	       // Handle Errors here.
	       var errorCode = error.code;
	       var errorMessage = error.message;
	       // The email of the user's account used.
	       var email = error.email;
	       // The firebase.auth.AuthCredential type that was used.
	       var credential = error.credential;
	       // ...
	       });
	}); 
    
    firebase.auth().onAuthStateChanged(firebaseUser =>{
        if(firebaseUser){
          console.log(firebaseUser);
        }else{
        	console.log("not log in");
        }
    });
});




  // niceScroll
  $("html").niceScroll();
    
    
  // Stick menu
  $(".menu").sticky({topSpacing:0});




  // Menu Scroll to content and Active menu
  var lastId,
    topMenu = $("#menu"),
    topMenuHeight = topMenu.outerHeight()+145,
    menuItems = topMenu.find("a"),
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

   $('a[href*=#]').bind('click', function(e) {
	e.preventDefault();
       
	var target = $(this).attr("href");
			

	$('html, body').stop().animate({ scrollTop: $(target).offset().top-140 }, 1000, function() {

	});
			
	return false;
   });

  $(window).scroll(function(){
   var fromTop = $(this).scrollTop()+topMenuHeight;
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });

   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   
   if (lastId !== id) {
       lastId = id;
       menuItems
         .parent().removeClass("active")
         .end().filter("[href=#"+id+"]").parent().addClass("active");
   }                   
  });  
  

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    
    $(".footer").css( "position", "relative" );
    $(".contact").css( "marginBottom", "0" );

}
else 
{

  // FadeTo elements
  if ( $(window).width() > 1023) {  

    tiles = $("h2, h3, .column-one, .column-two, .column-three, .grid li, .contact .content .form, .contact .content .contact-text ").fadeTo(0, 0);

    $(window).scroll(function(d,h) {
      tiles.each(function(i) {
          a = $(this).offset().top + $(this).height();
          b = $(window).scrollTop() + $(window).height();
          if (a < b) $(this).fadeTo(1000,1);
      });
    });

  }

}



  //Menu mobile click
  $( ".icon" ).click(function() {
    $( " ul.menu-click" ).slideToggle( "slow", function() {
    // Animation complete.
    });
  });


$(window).load(function(){

$(".preloader").delay(1000).fadeOut("slow")

  // Parallax
  if ($('.parallax-background').length) {
    $(".parallax-background").parallax();
  }
  
  // Parallax
  if ($('.parallax-background-partners').length) {
    $(".parallax-background-partners").parallax();
  }  

});
