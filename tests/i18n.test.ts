import test from 'node:test';
import assert from 'node:assert/strict';
import { translations } from '../src/contexts/LanguageContext';

test('i18n: Language dictionaries structure and parity (ISO/IEC 25010)', async (t) => {
    await t.test('should contain both pt-BR and en-US dictionaries', () => {
        assert.ok(translations['pt-BR'], 'pt-BR dictionary must exist');
        assert.ok(translations['en-US'], 'en-US dictionary must exist');
    });

    await t.test('all keys in pt-BR should have matching en-US translations', () => {
        const ptKeys = Object.keys(translations['pt-BR']);
        const enKeys = new Set(Object.keys(translations['en-US']));

        const missingInEn = ptKeys.filter((key) => !enKeys.has(key));
        assert.deepEqual(
            missingInEn,
            [],
            `The following keys are in pt-BR but missing in en-US: ${missingInEn.join(', ')}`
        );
    });

    await t.test('no translation values should be empty strings', () => {
        for (const lang of ['pt-BR', 'en-US'] as const) {
            for (const [key, value] of Object.entries(translations[lang])) {
                assert.ok(
                    value && value.trim().length > 0,
                    `Key "${key}" in language "${lang}" is empty`
                );
            }
        }
    });

    await t.test('critical navigation keys must exist and be valid', () => {
        const criticalNavKeys = [
            'nav.technology',
            'nav.solutions',
            'nav.about',
            'nav.login',
            'nav.language',
        ];

        for (const lang of ['pt-BR', 'en-US'] as const) {
            for (const key of criticalNavKeys) {
                assert.ok(
                    translations[lang][key],
                    `Critical key "${key}" missing in "${lang}"`
                );
            }
        }
    });
});
