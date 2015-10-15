 var first_card_clicked = null;
 var second_card_clicked = null;
 var total_possible_matches = 2;
 var match_counter = 0;

 function card_clicked(cardClicked) {
     $(cardClicked).hide();
     if (first_card_clicked == null) {
         first_card_clicked = $(cardClicked).prev().find('img').attr('src'); //do I need to  get the image source for the DOM?
     } else {
         second_card_clicked = $(cardClicked).prev().find('img').attr('src'); //again, see above comment.
         if (first_card_clicked === second_card_clicked) {
             match_counter++;
             console.log('match_counter is: ' + match_counter)
             first_card_clicked = null;
             second_card_clicked = null;
             if (match_counter === total_possible_matches) {
                 alert('You have won!');

             } else {
                 return console.log('click handler functionality is complete - the first one');
             }
         } else {
             console.log('first_card_clicked != second_card_clicked');
             $('.back').show(2000);
             first_card_clicked = null;
             second_card_clicked = null;
             console.log('click handler functionality is complete - the second');
         }
     }
 }