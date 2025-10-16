export const ensure = (checks) => (req, res, next) => {
try {
for (const fn of checks) fn(req)
next()
} catch (e) {
e.status = 400
next(e)
}
}


export const has = (key) => (req) => {
const v = req.body?.[key]
if (v === undefined || v === null || (typeof v === 'string' && !v.trim())) {
throw new Error(`Missing or invalid field: ${key}`)
}
}


export const optionalBoolean = (key) => (req) => {
const v = req.body?.[key]
if (v === undefined) return
if (typeof v !== 'boolean') throw new Error(`Field ${key} must be boolean`)
}