const { KeyManagementServiceClient } = require('@google-cloud/kms');
require('dotenv').config();
const kmsClient = new KeyManagementServiceClient();

const projectId = process.env.PROJECT_ID_KMS_CLOUD;
const locationId = 'global';
const keyRingId = process.env.SECRET_KMS_CLOUD;
const keyId = process.env.API_KEY_KMS_CLOUD;

const keyName = kmsClient.cryptoKeyPath(projectId, locationId, keyRingId, keyId);

const encrypt = async (plaintext: string) => {
    const [result] = await kmsClient.encrypt({ name: keyName, plaintext: Buffer.from(plaintext) });
    return result.ciphertext.toString('base64');
};

const decrypt = async (ciphertext: string) => {
    const [result] = await kmsClient.decrypt({ name: keyName, ciphertext: Buffer.from(ciphertext, 'base64') });
    return result.plaintext.toString();
};