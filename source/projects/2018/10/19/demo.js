$('input').change(function(){
    $('img').css('filter', 
    'blur(' + $('#blur').val() + 'px)'
    +' brightness(' + (100 - $('#brightness').val()) + '%)'
    +' contrast(' + (100 - $('#contrast').val()) + '%)'
    +' hue-rotate(' + $('#hue-rotate').val() + 'deg)'
    +' invert(' + $('#invert').val() + '%)'
    +' grayscale(' + $('#grayscale').val() + '%)'
    +' sepia(' + $('#sepia').val() + '%)'
    );
});
$('#URL').click(function () {
    $('input').each(function(){
        $(this).val(0);
    });
    $('img').css('filter', 'url(#change)');
})