const http = require('http'); // подключение модуля http
const fs = require('fs'); // подключение модуля для работы с файлом
const data1 = "header.html";
const data2 = "body.html";
const data3 = "footer.html";

let page = '';

http.createServer((request, response) => {// вызов метода создания http сервера
    fs.readFile(data1, 'utf8', (err, data) => {
        if (err) {
            console.log('Could not find or open file for reading\n');
            response.statusCode = 404;
            response.end();
        }
        else {
            page += data;
            fs.readFile(data2, 'utf8', (err, data) => {
                if (err) {
                    console.log('Could not find or open file for reading\n');
                    response.statusCode = 404;
                    response.end();
                }
                else {
                    page += data;
                    fs.readFile(data3, 'utf8', (err, data) => {
                        if (err) {
                            console.log('Could not find or open file for reading\n');
                            response.statusCode = 404;
                            response.end();
                        }
                        else {
							page += data;
                            console.log(`The file is read and sent to the client\n`);
                            response.writeHead(200, { 'Content-Type': 'text/html' });
                            response.end(page);
                        }
                    });
                }
            });
        }
    });

    console.log("Request accepted!");

}).listen(8080, () => {
    console.log("HTTP server works in 8080 port!\n");
});