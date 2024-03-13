"use server";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

export const createUser = async ({
  clerkId,
  name,
  username,
  email,
  picture,
}: {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
}) => {
  const ddbClient = new DynamoDBClient({
    region: process.env.AWS_REGION as string,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
  });
  const params = {
    TableName: "Users",
    Item: marshall({
      ClerkID: clerkId,
      Name: name,
      Username: username,
      Email: email,
      Picture: picture,
    }),
  };

  try {
    await ddbClient.send(new PutItemCommand(params));
  } catch (err) {
    throw err;
  }
};
