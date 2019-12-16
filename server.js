const request = require('request');     // send GET request
// const fs = require('fs');            // record comments by write file.
const Promise = require('promise');     // Sync request
function getId(keyword, offset){
    return new Promise(function(resolve,reject){
        var itemUrl = "https://shopee.tw/api/v2/search_items/?by=relevancy&keyword="+encodeURI(keyword)+"&limit=1&newest="+offset+"&order=desc&page_type=search&version=2";
        var headers = {
            'cookie': 'SPC_IA=-1; SPC_EC=-; SPC_F=uJfVdaXDECQeWpVG6fFrKxChBxkFRyET; REC_T_ID=426f61e4-184a-11ea-9e3c-b49691377c10; SPC_U=-; _gcl_au=1.1.2020709365.1575651782; _med=refer; _ga=GA1.2.1697289793.1575651790; csrftoken=8KtgDHaeRD8UHvUIh72W1ocPlAJ9w1Yd; SPC_SI=ilo74b0u27rgi14t5gh4g0hx4eh36umi; __BWfp=c1576212436451x233d8f015; cto_lwid=fae1c107-56b7-4a4a-a42e-9c7df655dc38; AMP_TOKEN=%24NOT_FOUND; _gid=GA1.2.99368850.1576212437; REC_MD_20=1576213425; SPC_T_IV="sywUg94iXsm1Lhu3KKl4Dg=="; SPC_T_ID="OcEKKxzFyiSeDFiIKLSDWclKE+pDQGYvJjIxrZYB72r0Bz8UvUXS7tlgLHAdVggWhsrjSd6LIGLU8mGNgG+zLqE6X8gtVifjVg9PjS0jK3o="',
            'referer': 'https://shopee.tw/%F0%9F%8C%9F%E7%8F%BE%E8%B2%A8%E7%86%B1%E9%8A%B7%E5%8D%83%E4%BB%B6%F0%9F%8C%9F%E8%88%92%E6%9C%8D%E6%A3%89%E7%9F%AD%E6%AC%BE%E7%9F%AD%E8%A2%96%E4%B8%8A%E8%A1%A3-%E7%9F%AD%E7%89%88-%E4%B8%8A%E8%A1%A3-%E5%9C%93%E9%A0%98t%E6%81%A4-%E5%AF%AC%E9%AC%86%E7%9F%AD%E8%A2%96-%E4%BC%91%E9%96%92%E4%B8%8A%E8%A1%A3-%E5%A5%B3%E7%94%9F-t%E6%81%A4-%E5%A5%B3%E7%94%9F%E8%A1%A3%E8%91%97-%E7%9F%AD%E8%A2%96-t-%E6%81%A4-i.3392568.10624636',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
            'x-api-source': 'pc'
        };
        var options = {
            uri:itemUrl,
            json:true,
            headers: headers
        };
        request(options, function(err, res, body){
            if(res.statusCode==200)
                resolve(body);
            else
                reject(err);
        });
    });
}
var ratingTotal=-1;
var retryConnection = 0;
function getRating(itemid, shopid, ratingOffset){
    return new Promise(function(resolve,reject){
        var options = {
            uri:"https://shopee.tw/api/v2/item/get_ratings?filter=0&flag=1&itemid="+itemid+"&limit=5&offset="+ratingOffset+"&shopid="+shopid+"&type=0",
            json:true,
            headers:{
                'cookie': 'SPC_IA=-1; SPC_EC=-; SPC_F=uJfVdaXDECQeWpVG6fFrKxChBxkFRyET; REC_T_ID=426f61e4-184a-11ea-9e3c-b49691377c10; SPC_U=-; _gcl_au=1.1.2020709365.1575651782; _med=refer; _ga=GA1.2.1697289793.1575651790; csrftoken=8KtgDHaeRD8UHvUIh72W1ocPlAJ9w1Yd; SPC_SI=ilo74b0u27rgi14t5gh4g0hx4eh36umi; __BWfp=c1576212436451x233d8f015; cto_lwid=fae1c107-56b7-4a4a-a42e-9c7df655dc38; AMP_TOKEN=%24NOT_FOUND; _gid=GA1.2.99368850.1576212437; REC_MD_20=1576213425; SPC_T_IV="sywUg94iXsm1Lhu3KKl4Dg=="; SPC_T_ID="OcEKKxzFyiSeDFiIKLSDWclKE+pDQGYvJjIxrZYB72r0Bz8UvUXS7tlgLHAdVggWhsrjSd6LIGLU8mGNgG+zLqE6X8gtVifjVg9PjS0jK3o="',
                'referer': 'https://shopee.tw/%F0%9F%8C%9F%E7%8F%BE%E8%B2%A8%E7%86%B1%E9%8A%B7%E5%8D%83%E4%BB%B6%F0%9F%8C%9F%E8%88%92%E6%9C%8D%E6%A3%89%E7%9F%AD%E6%AC%BE%E7%9F%AD%E8%A2%96%E4%B8%8A%E8%A1%A3-%E7%9F%AD%E7%89%88-%E4%B8%8A%E8%A1%A3-%E5%9C%93%E9%A0%98t%E6%81%A4-%E5%AF%AC%E9%AC%86%E7%9F%AD%E8%A2%96-%E4%BC%91%E9%96%92%E4%B8%8A%E8%A1%A3-%E5%A5%B3%E7%94%9F-t%E6%81%A4-%E5%A5%B3%E7%94%9F%E8%A1%A3%E8%91%97-%E7%9F%AD%E8%A2%96-t-%E6%81%A4-i.3392568.10624636',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
                'x-api-source': 'pc'
            }
        }
        request(options, function(err, res, body){
            if(err)
                getRating(itemid, shopid, ratingOffset);
            else if(body.data.item_rating_summary.rating_total == 0){
                console.log("Finish! (no comment)");
                keywordOffset++;
                main();
            }
            else if(res.statusCode==200){
                //console.log(body);
                ratingOffset+=5;
                for(var i=0;i<body.data.ratings.length;i++)
                    console.log("\x1b[33m", parseInt(ratingOffset+i-4)+"/"+body.data.item_rating_summary.rating_total, "\x1b[0m\x1b[33m", body.data.ratings[i].rating_star+"\x1b[0m星", body.data.ratings[i].comment);
                ratingTotal = body.data.item_rating_summary.rating_total;
                if(ratingTotal <= ratingOffset){
                    keywordOffset++;    // conitue next item
                    main();
                }
                else
                    getRating(itemid, shopid, ratingOffset);
            }
        });
    });
}
var keywordOffset=0;
function main(){
    // put keyword vvvvvvv
    var keyword = "Canon 50mm";
    // put keyword ^^^^^^^
    getId(keyword, keywordOffset)
    .then(function (fullfilled){
        ratingTotal=-1;
        console.log("      --以下為  ", "\x1b[33m", fullfilled.items[0].name+"\x1b[0m", "  的評論--");
        getRating(fullfilled.items[0].itemid, fullfilled.items[0].shopid, 0)
        .then(function(fullfilled){

        })
        .catch(function(error){
            console.log(error);
        });
    })
    .catch(function (error){
        console.log(error);
    })
}
main();