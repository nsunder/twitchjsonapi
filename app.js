$(document).ready(function(){

      var followers=[];
      var onlineGroup=[];
      var offlineGroup =[];
      var logo;
      var name;
      var status;
      var TempArray=[];


      var helperHTML = function(){
        return   "<div id='addedElem'> <div class='col-md-4 col-xs-4'>"+
            "  <img id='myimage' alt='image.jpeg' class='img-circle' src="+ logo +"/>"+
          " </div>"+

          " <div class='col-md-4 col-xs-4'>"+
            "  <h3> "+name+ "</h3>" +
          "  </div>"+

          "<div class='col-md-4 col-xs-4'>"+
          "<h3>"+ status + "</h3>"+

            "</div></div>";
      }

      $.getJSON("https://api.twitch.tv/kraken/users/freecodecamp/follows/channels/",function(data){

          for(var i=0; i< data.follows.length; i++){
              followers.push(data.follows[i].channel.display_name);
          }
          followers.push("ESL_SC2");
          followers.push("RobotCaleb");

          for(var i=0; i< followers.length; i++){
            var url = "https://api.twitch.tv/kraken/streams/"+followers[i];//+"/?callback=?";

            console.log('1');
            $.getJSON(url).done(function(data){
              // console.log("Followers Loop");
              if(data.error){
                logo="";
                name=data.message;
                status=data.error;
                $("#helper").prepend(helperHTML());
                // console.log("data.error");
                console.log('2');

              }

              if(data.stream === null){
                $.getJSON(data._links.channel,function(datasample){
                  logo = datasample.logo;
                  status = "OFFLINE";
                  name = datasample.name;
                  offlineGroup.push(name);
                  $("#helper").prepend(helperHTML());
                  console.log('3');
                })
              }


                if(data.stream !== null){
                     logo= data.stream.channel.logo;
                     status = "ONLINE";//data.stream.channel.status;
                     name = data.stream.channel.display_name;
                     onlineGroup.push(name);
                    $("#helper").prepend(helperHTML());
                    console.log('4');
                }




            })
        }

      });

      //function to change the background color of the buttons.

      $("button").click(function(){


             if($("button").hasClass('orangeClr')) {
                $("button").removeClass('orangeClr');
                $(this).addClass('orangeClr');
              }
              else {
                $(this).addClass('orangeClr');
              }

              if($(this).data('display') === "online"){
                $(".output").empty();
                pullOnlineUsers(onlineGroup);
              }

              if($(this).data('display')==="offline"){
                $(".output").empty();
                  pullOnlineUsers(offlineGroup);

              }

              if($(this).data("display")==="all"){
                for(var i=0; i< onlineGroup.length;i++){
                  offlineGroup.push(onlineGroup[i]);
                }
                pullOnlineUsers(offlineGroup);

              }
         });

         function pullOnlineUsers(data){

           console.log(data.length);
           for(var i=0; i< data.length; i++){
             var url = "https://api.twitch.tv/kraken/streams/"+data[i];//+"/?callback=?";

             $.getJSON(url).done(function(data){

               if(data.error){
                 logo="";
                 name=data.message;
                 status=data.error;
                 $("#helper").prepend(helperHTML());

               }

               if(data.stream === null){
                 $.getJSON(data._links.channel,function(datasample){
                   logo = datasample.logo;
                   status = "OFFLINE";
                   name = datasample.name;
                   $("#helper").prepend(helperHTML());
                    console.log("data NULL");

                 })
               }


               if(data.stream !== null){
                    logo= data.stream.channel.logo;
                    status = "ONLINE";//data.stream.channel.status;
                    name = data.stream.channel.display_name;
                   $("#helper").prepend(helperHTML());
                    console.log("Data !NULL");
               }



             })
         }

         }

        // var searchTerm = followers.search($("#srch-term").val())
        //  console.log("searchTem");
        // // console.log(searchTerm);
        //
        //  $("#srch-term").keypress(function(){
        //
        //   if(  ($.inArray($(this).val(), followers))> -1)
        //   {
        //     TempArray.push($.inArray($(this).val(), followers));
        //     $(".output").empty();
        //     pullOnlineUsers(TempArray);
        //   }
        //  })



})
