# Symphony Install+ — Version 1 Working Build

This build now contains the complete core reporting flow.

## Included
- Symphony-branded home screen
- App name: **Symphony Install+**
- Retail Display Installation Report subtitle
- Blank report creation
- Automatic report number
- Job number / reference
- Store / site name
- Site address
- Site contact
- Installation date
- Fitter name
- Before installation photos
- During installation photos
- Completed installation photos
- Camera and photo-library support
- Remove unwanted photos
- Unlimited issue reports
- Issue type
- Low / Medium / High priority
- Issue description
- Action taken
- Outstanding Yes / No
- Multiple issue photos
- Completion status
- Fitter comments
- Fitter finger signature
- Customer name
- Customer comments
- Customer finger signature
- Review screen
- Local saved draft
- Professional PDF containing photos, issues, comments and signatures
- Native iPhone / Android Share menu

## Screen flow
Home
→ Job Details
→ Installation Photos
→ Issues
→ Fitter Sign-Off
→ Customer Sign-Off
→ Review & Share

## Project dependencies
The app uses Expo / React Native plus:
- expo-image-picker
- expo-print
- expo-sharing
- @react-native-async-storage/async-storage
- react-native-svg

## Important testing note
This is a proper Expo project rather than a Snack-only prototype.
The next stage is to put this build into a cloud-hosted Expo/EAS project so it can be installed and tested on an iPhone without requiring Node.js on the user's PC.

## Next polish items
- App icon and splash screen
- Validation for required fields
- Larger full-screen photo preview
- Optional acknowledgement wording above customer signature
- Better PDF page-break handling for very large photo reports
- Build/test packaging for iPhone and Android
