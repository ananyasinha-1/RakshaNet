# RakshaNet
RakshaNet is a web-based Women Safety SOS system that is intended to offer prompt assistance in an emergency. Users can share their current location, initiate an SOS alert, and contact local emergency services like police stations and hospitals with just one tap.

🚨 Problem Statement

Women often face unsafe situations where immediate help is required, but accessing emergency services quickly can be difficult. Delays in communication, lack of location sharing, and complex interfaces reduce the chances of timely assistance.

RakshaNet addresses this problem by offering a one-tap SOS solution that instantly shares the user’s location and emergency status.

💡 Solution Overview

RakshaNet provides a simple and user-friendly emergency alert mechanism that allows users to:

Trigger SOS alerts instantly

Share live location in real time

View nearby emergency services

Control and cancel alerts when needed

The system is designed to be fast, easy to use, and suitable for real-world scalability in the future.

✨ Features

One-tap SOS activation
Instantly trigger an emergency alert with a single tap.

Instant live location sharing
Automatically captures and shares the user’s current location.

Real-time Firebase backend updates
SOS events and status updates are synced instantly using Firebase.

Nearby police & hospitals in one click
Displays nearby emergency services based on user location.

SOS cancel & status control
Allows users to cancel the alert and monitor its current status.

🛠️ Technologies Used

HTML, CSS, JavaScript – Frontend development

Firebase Realtime Database – Real-time SOS data storage & updates

Google Geolocation API – User location access

Google Maps API – Location display & nearby emergency places

📊 System Workflow

User taps the SOS button

System captures the current location

SOS data is sent to Firebase in real time

Location and emergency status are updated instantly

User can cancel or monitor SOS status

⚠️ Limitations

Requires an active internet connection

Prototype does not include direct police API integration

Location accuracy depends on device GPS

🔮 Future Enhancements

Long-press or countdown-based SOS activation

Offline SMS-based alert fallback

Emergency type categorization (medical, threat, accident)

Audio/video evidence capture

Contact hierarchy & escalation logic

🔄 Repository Status

This repository is under active development.
We will be continuously updating this repository with new features, improvements, and optimizations in future updates.
