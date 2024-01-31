// import our main App component
import {renderToString} from 'react-dom/server';

import App from "../../src/App";
import {getServerState} from 'react-instantsearch';

import path from "path";
import fs from "fs";

export default (req: Express.Request, res: any) => {

    // point to the html file created by build tool
    const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');

    fs.readFile(filePath, 'utf8', async (err, htmlData) => {
        if (err) {
            console.error('err', err);
            return res.status(404).end()
        }
        const headRegex = Array.from(htmlData.matchAll(/<head>(.*?)<\/head>/gms), m => m[1])
        const headTagData = headRegex.length ? headRegex[0] : headRegex


        const serverState = await getServerState(<App/>, {renderToString});
        // render the app as a string
        const html = renderToString(<App serverState={serverState}/>);

        //Return the server side html
        return res.send(
            {
                html: html,
                htmlData: headTagData
            }
        )
        // inject the rendered app into our html and send it
        // return res.send(
        //     htmlData.replace(
        //         '<div id="root"></div>',
        //         `<div id="root">${html}</div>`
        //     )
        // );
    });
}