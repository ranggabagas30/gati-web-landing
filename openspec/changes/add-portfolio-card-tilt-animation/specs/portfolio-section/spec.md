## ADDED Requirements

### Requirement: Portfolio Card Tilt Animation
Portfolio cards SHALL tilt/rotate BEFORE vertical translation and maintain rotation:
- Cards SHALL rotate on the Y-axis and Z-axis in parallel at the START of animation
- Y-axis and Z-axis rotations SHALL execute simultaneously (not sequentially)
- Rotation SHALL complete BEFORE the vertical (Y) translation phase begins
- Rotation SHALL NOT revert to 0° - the rotated state SHALL be maintained
- Cards SHALL remain rotated during and after Y translation
- Rotation duration SHALL be sufficient and tied to scroll distance for smooth visual effect

#### Scenario: Card tilts and maintains rotation
- **WHEN** the user scrolls and a card begins its transition from peek to active state
- **THEN** the card rotates on the Y-axis (e.g., from 0° to -15°) AND Z-axis (e.g., from 0° to 5°) simultaneously
- **AND** both rotations progress in parallel over sufficient scroll distance
- **AND** rotation completes with the card at final rotated angles (e.g., rotateY: -15°, rotateZ: 5°)
- **AND** the rotated state is maintained (NOT reverted to 0°)
- **AND** after rotation completes, the card translates vertically while staying rotated

#### Scenario: Card maintains rotation through all states
- **WHEN** a card transitions from active to archived state
- **THEN** the card maintains its rotated state (e.g., rotateY: -15°, rotateZ: 5°)
- **AND** the card remains visibly tilted/rotated in both active and archived states
- **AND** no rotation reset occurs - the 3D perspective is preserved throughout

### Requirement: 3D Transform Perspective
The card container SHALL support 3D CSS transforms:
- Container SHALL have CSS perspective property enabled
- Cards SHALL have transform-style: preserve-3d for proper 3D rendering
- Rotation transformations SHALL be GPU-accelerated for smooth performance

#### Scenario: 3D transforms render correctly
- **WHEN** cards rotate during animation
- **THEN** the 3D perspective is visible and realistic
- **AND** rotation appears smooth without visual glitches
- **AND** performance remains smooth (60fps target)

## MODIFIED Requirements

### Requirement: Portfolio Card Animation Timeline Sequencing
The GSAP timeline for portfolio cards SHALL sequence transformations in this order:
1. Rotation transformations (rotateY AND rotateZ) execute in parallel FIRST
2. Rotation progresses with sufficient duration tied to scroll distance
3. Rotation completes at final angles (NOT reverted to 0°)
4. Vertical position changes (y property) follow while maintaining rotation
5. Z-index changes for stacking order occur as needed

Rotations SHALL be parallel (simultaneous), and rotation phase SHALL NOT overlap with translation phase.

#### Scenario: Timeline executes parallel rotation then translation
- **WHEN** the GSAP timeline animates a card from peek to active
- **THEN** the card's rotateY changes from 0° to final angle (e.g., 0° → -15°)
- **AND** the card's rotateZ changes from 0° to final angle (e.g., 0° → 5°) simultaneously with rotateY
- **AND** both rotations progress in parallel over sufficient scroll distance for smooth effect
- **AND** rotation completes with card at final rotated angles (e.g., rotateY: -15°, rotateZ: 5°)
- **AND** rotation is maintained (NOT reverted to 0°)
- **AND** THEN the card's y position translates from initial to centered while staying rotated
- **AND** the card's zIndex changes to bring it to the front
- **AND** the sequence creates a "tilt then lift while rotated" visual effect

