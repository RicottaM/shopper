## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

3. Configure environment variables

   Create a `.env` file in the root of your project and add the following:

   ```plaintext
   REACT_APP_API_URL=http://localhost:3000
   ```

   When running on a mobile phone, ensure it is connected to the same Wi-Fi network as the computer running the backend. Then, set the `REACT_APP_API_URL` to your computer's local IP address:

   ```plaintext
   REACT_APP_API_URL=http://<computer_local_ip>:3000
   ```

4. Run the backend server (from the appropriate branch)

5. Enjoy
