const request = require("supertest")
const app = require("../src/App");

const payload = {
    name: 'HenryQRM',
    percent: 50,
}
const feature = '/partners'

describe('Partner feature', () => {
    test('Name should be is a pure string and percent between 1 and 100', async () => {
        const {
            text,
            statusCode,
        } = await request(app)
            .post(feature)
            .send(payload)

        const {
            error,
            partner,
        } = JSON.parse(text)

        expect(statusCode).toBe(200)
        expect(error).toBeFalsy()
        expect(partner.name).toBe(payload.name)
        expect(partner.percent).toBe(payload.percent)
    })

    const testWithoutProperty = async (property, propertyName) => {
        const partner = {
            ...payload,
        }

        delete partner[property]

        const {
            text,
            statusCode,
        } = await request(app).post(feature).send(partner)
        const {
            error,
        } = JSON.parse(text)

        expect(statusCode).toBe(400)
        expect(error).toContain(propertyName)
        expect(error).toContain('obrigatório')
    }

    test('Partners name is required', async () => {
        await testWithoutProperty('name', 'nome')
    })

    test('Partners percent is required', async () => {
        await testWithoutProperty('percent', 'percentual')
    })

    const testBetweenPercentInvalid = async percent => {
        const partner = {
            ...payload,
            percent,
        }
        const {
            text,
            statusCode,
        } = await request(app).post(feature).send(partner)
        const {
            error,
        } = JSON.parse(text)

        expect(statusCode).toBe(400)
        expect(error).toContain('percentual')
        expect(error).toContain('1 e 100')
    }

    test('Percent should be is > 0', async () => {
        await testBetweenPercentInvalid(0)
        await testBetweenPercentInvalid(-1)
    })

    test('Percent should be is <= 100', async () => {
        await testBetweenPercentInvalid(101)
    })
})