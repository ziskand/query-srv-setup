const fs = require('fs');
const csv = require('csv-parser');

const gremlinService = require("../services/gremlin.service");

const loadData = async () => {
    const query = `g.V(['entity',source]).addE(['reffers',edge]).to(g.V(['entity',target]))`;

    try {
        if (!gremlinService.client) {
            return null;
        }

        await gremlinService.client.open();
        fs.createReadStream('../../../../data/s_t_e_wiki_sent_2.csv')
            .pipe(csv())
            .on('data', async (data) => {
                try {
                    console.log("data", data);
                    await gremlinService.client.submit(query, {
                        source: String(data.source),
                        edge: String(data.edge),
                        target: String(data.to),
                    })
                } catch (error) {
                    return error
                }
            })
            .on('end', () => {
                console.log("Initital data loaded");
            });
    } catch (error) {
        console.error(error);
    }

    gremlinService.client.close();
}

module.exports = {
    loadData
}