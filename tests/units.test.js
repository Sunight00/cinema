const fs = require('fs');

describe('CHECK RESULT FILE',()=>{
    test('They should contain response from the actor controller', ()=>{
        //const filePath = path.join(__dirname, 'response.json');
        const fileContent = fs.readFileSync('./tests/actorsRes.json', 'utf8');
        const jsonData = JSON.parse(fileContent);

        const expectedResult = 200;
        expect(typeof jsonData).toBe('object');
        expect(jsonData).not.toBeNull();
        expect(Array.isArray(jsonData.data)).toBe(true);
        expect(jsonData.statusCode).toBe(expectedResult);
        expect(jsonData.data.length).toBe(2)
    })




    test('They should contain response from the genre controller', ()=>{
        //const filePath = path.join(__dirname, 'response.json');
        const fileContent = fs.readFileSync('./tests/genreRes.json', 'utf8');
        const jsonData = JSON.parse(fileContent);

        const expectedResult = 200;
        expect(typeof jsonData).toBe('object');
        expect(jsonData).not.toBeNull();
        expect(Array.isArray(jsonData.data)).toBe(true);
        expect(jsonData.statusCode).toBe(expectedResult);
        expect(jsonData.data.length).toBe(2)
    })


    test('They should contain response from the movie controller', ()=>{
        //const filePath = path.join(__dirname, 'response.json');
        const fileContent = fs.readFileSync('./tests/movieRes.json', 'utf8');
        const jsonData = JSON.parse(fileContent);
        
        const expectedResult = 200;
        expect(typeof jsonData).toBe('object');
        expect(jsonData).not.toBeNull();
        expect(Array.isArray(jsonData.data)).toBe(true);
        expect(jsonData.statusCode).toBe(expectedResult);
        expect(jsonData.data.length).toBe(3)
    })


        test('They should contain response from the genre controller', ()=>{
        //const filePath = path.join(__dirname, 'response.json');
        const fileContent = fs.readFileSync('./tests/genreRes.json', 'utf8');
        const jsonData = JSON.parse(fileContent);
        
        const expectedResult = 200;
        expect(typeof jsonData).toBe('object');
        expect(jsonData).not.toBeNull();
        expect(Array.isArray(jsonData.data)).toBe(true);
        expect(jsonData.statusCode).toBe(expectedResult);
        expect(jsonData.data.length).toBe(2)
    })
})

