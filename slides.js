// require:JQuery
var json
var pages
var now_page

function init(file_path,elm){
    $.getJSON(file_path , function(data) {
        json=data
        document.getElementById('style').href='./styles/' + json['settings']['theme'] + '.css';
        pages=json['pages']
        now_page=0
        show_page(now_page,elm)
    })
    $(document).on('keydown',function(event){
        switch(event.keyCode){
            case 13: // Return
            case 9:  // Tab
            case 39: // Left
                next_page(elm)
                break
            case 27: // Esc
            case 37: // Right
                prev_page(elm)
                break
        }
    })
}

function prev_page(elm){
    if(now_page>0){
        now_page--
        show_page(now_page,elm)
    }
}
function next_page(elm){
    if(now_page<pages.length-1){
        now_page++
        show_page(now_page,elm)
    }
}


function show_page(num,elm){
    var page=pages[num];
    var l=page.length
    elm.empty()
    for(var i=0;i<l;i++){
        switch(page[i]['type']){
            case 'p':
                elm.append($("<p>").text(page[i].text))
                break;

            case 'pstrong':
                elm.append($("<p>").attr('class','strong').text(page[i].text))
                break;

            case 'pstrike':
                elm.append($("<p>").attr('class','strike').text(page[i].text))
                break;

            case 'image':
                elm.append($("<img>").attr({
                    'src':page[i].url,
                    'alt':page[i].alt,
                }))
                break;
            case 'ul':
                var ul=$("<ul>")
                for(var j=0;j<page[i]['list'].length;j++){
                    ul.append($("<li>").text(page[i].list[j]))
                }
                elm.append(ul)
                break;
            case 'ol':
                var ol=$("<ol>")
                for(var j=0;j<page[i]['list'].length;j++){
                    ol.append($("<li>").text(page[i].list[j]))
                }
                elm.append(ol)
                break;
            case 'title':
                elm.append($("<h1>").text(page[i].text))
                break;
            case 'subtitle':
                elm.append($("<h2>").text(page[i].text))
                break;
            case 'pagetitle':
                elm.append($("<h3>").text(page[i].text))
                break;

        }
    }
    if(json['settings']['show_page_number']){
        elm.append($("<div>").attr('id','pagenum').text(""+(now_page+1)+"/"+pages.length))
    }
}
