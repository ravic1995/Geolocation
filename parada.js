function getGET() {
    var loc = document.location.href;
    var getString = loc.split('?')[1];
    var GET = getString.split('&');
    var get = {};//this object will be filled with the key-value pairs and returned.

    for (var i = 0, l = GET.length; i < l; i++) {
        var tmp = GET[i].split('=');
        get[tmp[0]] = unescape(decodeURI(tmp[1]));
    }
    return get;
}

function completeData()
{
    var xx = getGET();
    $("#lblEmpresa").html(xx.nom);
    $("#lblLinea").html(xx.lin);
}