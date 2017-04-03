export class HttpServes {
    get(url) {
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);

            xhr.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        resolve(this.response);
                    } else {
                        let error = new Error(this.statusText);
                        error.code = this.status;
                        reject(error);
                    }
                }
            };

            xhr.send();
        })
    };

    post(url) {
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);

            xhr.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        resolve(this.response);
                    } else {
                        let error = new Error(this.statusText);
                        error.code = this.status;
                        reject(error);
                    }
                }
            };

            xhr.send();
        })
    };
}