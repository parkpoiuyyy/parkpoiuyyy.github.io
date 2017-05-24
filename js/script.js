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
    
    const counterPath = firebase.database().ref().child('counter');
    counterPath.once('value').then(function(snapshot) {
      var counter = snapshot.val().portCounter+1;
      counterPath.set({
            portCounter : counter
      });
   
    }); 
    
    const messages = firebase.database().ref().child('messages');
    messages.on('child_added', function(snapshot) {
        var li_template="";
        var comment=snapshot.val().content;
        var name=snapshot.val().emailAddress;
        var photoURL=snapshot.val().photoURL;
        var commenturl=snapshot.val().commentURL;
        var timestamp = snapshot.val().time;
        var time = moment(timestamp).format('LLL');
	console.log(snapshot.val().key);
	var commentId='1';
			  li_template+=`    <li>
			                 	    <div class="comment-main-level">
							               <div class="comment-avatar"><img src="${photoURL}" alt=""></div>
							               <div class="comment-box">
						                 		<div class="comment-head">
						                 				<h6 class="comment-name"><a>${name}</a></h6>
							                 			<span>${time}</span>
								                 		
							                 			<i class="fa fa-heart"></i>
							                 	</div>
							                 	<div class="comment-content" id="comment-${commentId}">
							                 	<img id="commentImage" src="${commenturl}" alt="">
							                 	
						                 		</div>
						                 	</div>
					                 	</div>
				                 	</li>`;
        $("#comments-list").append(li_template);
	$(`#comment-${commentId}`).text(`${comment}`);
	commentId++;
        
    });
    
    
  document.getElementById("fileButton").addEventListener('change',function(e){
    var file =e.target.files[0];
    var storageRef = firebase.storage().ref('photos/'+file.name);
    var task = storageRef.put(file);
    task.on('state_changed',
       
       function progress(snapshot){
         var percentage=(snapshot.bytesTransferred/snapshot.totalBytes) *100;
         document.getElementById('uploader').value=percentage;
       },
       function error(err){
         
       },
       function complete(){
          storageRef.getDownloadURL().then(function(url) {
            document.getElementById("submit-add").setAttribute("data", url);
            

          }).catch(function(error) {
           // Handle any errors
          });
       }
    );
    
  });  
  
    
    
	$(document).on('click',"#googleSignin",function(){
		
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
	
    $(document).on('click','#submit-add',function(){
      if(this.form.userCmnt.value==0){
        alert('Message cant be void');
      }else{
      var user = firebase.auth().currentUser;
      var uid;
      var email;
      var photo;
      var commenturl = document.getElementById("submit-add").getAttribute("data");
      if (user != null){
        uid=user.uid;
        email=user.email;
        photo=user.photoURL;
      }
      firebase.database().ref().child('messages').push({
          sender : uid,
          content : this.form.userCmnt.value ,
          emailAddress : email,
          photoURL: photo,
          commentURL: commenturl,
          time : firebase.database.ServerValue.TIMESTAMP
      }); 
      $("#userCmnt").val("");
      document.getElementById("submit-add").setAttribute("data", '');
      document.getElementById('uploader').value=0;
      }
    }); 
    
    
    
    firebase.auth().onAuthStateChanged(firebaseUser =>{
        if(firebaseUser){
          var loggedinHtml=`<i id="googleSignout" style="float: right" class="fa fa-google-plus-official">Hi, ${firebaseUser.email}.Sign out here.</i>`;
          $("#googleSignout").html(loggedinHtml);
          $('#googleSignin').hide();
          $("#googleSignout").show();
          $("#comment-add").show();
        }else{
        	console.log("not log in");
        	$('#googleSignin').show();
        	$("#googleSignout").hide();
        	$("#comment-add").hide();
        }
    });
    
    $("#googleSignout").click(function(){
        firebase.auth().signOut();
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
