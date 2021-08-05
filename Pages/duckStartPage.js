exports.DuckStartPage = class DuckStartPage{
    constructor(page){
        this.page = page;
    }

    async goto(){
        await this.page.goto('https://duckduckgo.com');
    }

    

}