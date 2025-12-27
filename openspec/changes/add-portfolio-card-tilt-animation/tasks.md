## 1. Implementation
- [ ] 1.1 Add CSS 3D perspective to card container for proper rotation rendering
- [ ] 1.2 Add CSS transform-style: preserve-3d to cards for 3D effect
- [ ] 1.3 Restructure GSAP timeline to sequence rotation BEFORE Y translation
- [ ] 1.4 Add parallel rotateY transformation (e.g., 0° → -15°, no revert)
- [ ] 1.5 Add parallel rotateZ transformation (e.g., 0° → 5°, no revert) executing simultaneously with rotateY
- [ ] 1.6 Configure sufficient rotation duration tied to scroll distance (enough scroll for smooth rotation)
- [ ] 1.7 Ensure rotation completes and is maintained (NOT reverted to 0°)
- [ ] 1.8 Configure Y translation to follow rotation while maintaining rotated state
- [ ] 1.9 Test "tilt then lift while rotated" visual effect across viewport sizes
- [ ] 1.10 Verify performance and smooth animation playback

