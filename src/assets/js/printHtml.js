function printHtml(html)
{
    var mywindow = window.open('', 'PRINT', 'height=400,width=600');

    mywindow.document.write(html);

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
}