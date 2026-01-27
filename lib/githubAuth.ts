import { SignJWT, importPKCS8} from "jose";

const APP_ID = process.env.GITHUB_APP_ID!;
const INSTALLATION_ID = process.env.GITHUB_INSTALLATION_ID!;
const PRIVATE_KEY = process.env.GITHUB_PRIVATE_KEY!;

export async function getInstallationToken() {
    const key = await importPKCS8(
        PRIVATE_KEY.replace(/\\n/g, "\n"),
        "RS256"
    )

    const jwt = await new SignJWT({})
        .setProtectedHeader({alg: "RS256"})
        .setIssuedAt()
        .setExpirationTime("10m")
        .setIssuer(APP_ID)
        .sign(key);

    const res = await fetch(
        `https://api.github.com/app/installations/${INSTALLATION_ID}/access_tokens`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${jwt}`,
                Accept: "application/vnd.github+json",
            },
        }
    );

    if(!res.ok){
        console.log('******got in this Error')
        throw new Error("Failed to get installation token");
    }

    const data = await res.json();
    console.log('*******data is: ', data)
    return data.token;

}

