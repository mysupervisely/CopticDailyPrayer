# Liturgical Validation Matrix

Primary validation source: Southern United States Coptic Orthodox Diocese (SUSCopts).

This file is a release gate for Church-day logic. The application must not infer an exception merely from weekday rules.

| Case | Expected behavior | SUSCopts basis |
| --- | --- | --- |
| Ordinary Wednesday | Fasting day | Weekly Wednesday fast |
| Ordinary Friday | Fasting day | Weekly Friday fast |
| Wednesday/Friday during Holy Fifty | Not a fasting day | Holy Fifty exception |
| Major feast on Wednesday/Friday | Feast exception, not ordinary weekly fast | Major-feast exception |
| Holy Great Fast | Fasting season | 55-day fast |
| Holy Week | Pascha/Holy Week rules, not ordinary Agpeya assumptions | Holy Week practice |
| Apostles' Fast | Fasting season from after Pentecost through 5 Epep | Variable fast |
| St. Mary's Fast | Fasting season, 1-16 Mesori | Annual fast |
| Nativity Fast | Fasting season | 43-day fast |
| Paramoun | Fasting day(s) before Nativity/Theophany | Paramoun rules |
| Nayrouz through eve of Cross | Nayrouz season label, not repeated "Coptic New Year" feast | 1 Tout through Feast of Cross observance |
| Feast of Cross | Feast/season boundary | 17 Tout |

## Implementation rule

Upstream Church data is useful for daily Coptic date, celebrations, Synaxarium, and readings, but local safeguards must never convert a documented SUSCopts exception into an incorrect fasting status. Movable feast dates must come from authoritative Church data rather than guessed Gregorian arithmetic.

## Release checks

Before merging calendar changes, manually inspect at least one date from every row above and verify:
1. Gregorian and Coptic dates.
2. Season/feast wording.
3. Fasting status.
4. Synaxarium availability.
5. Appointed readings and service grouping.
6. Home and Calendar show the same Church-day status.

## Verified SUSCopts reference rules

These rules are validation references, not a replacement for date-specific authoritative data.

- Weekly fasting: Wednesday and Friday are ordinarily fasting days. SUSCopts identifies exceptions including the Holy Fifty after Resurrection and Major Feasts.
- Holy Fifty: fasting is not permitted during the fifty-day period from Resurrection through Pentecost, including Wednesdays and Fridays.
- Nayrouz: the joyful Nayrouz rite begins on 1 Tout and continues through the Feast of the Cross on 17 Tout. Do not render "Nayrouz" as though it applies only to 1 Tout.
- Feast of the Cross: begins on 17 Tout. Calendar UI must distinguish the season/rite from the specific feast day.
- Fixed fasts: St. Mary's Fast begins 1 Mesori and the Nativity Fast begins 16 Hathor; date conversion and leap-year handling must still be validated for each Gregorian year.
- Paramoun: date and duration can vary and must come from authoritative calendar data rather than a simple weekday rule.

### Source hierarchy
1. SUSCopts date-specific calendar/readings where available.
2. Other verified Coptic Orthodox diocesan sources only when SUSCopts does not cover the datum.
3. Coptic.io may provide application data, but the UI must identify it honestly and validation must not silently treat it as SUSCopts.

### Release checks
For each representative date, compare Gregorian date, Coptic date, season/rite, feast, fasting status, Synaxarium, and appointed readings against SUSCopts before production release.
