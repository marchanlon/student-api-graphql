import { GraphQLObjectType, GraphQLString } from "graphql";

import { PersonType } from ".";
import { PersonService } from "../../services";

const PersonIdentificationType = new GraphQLObjectType({
  name: "PersonIdentification",
  description: "Person Identification",
  fields: () => ({
    bannerId: {
      type: GraphQLString,
      description: "The identification number used to access a person"
    },
    dataOrigin: {
      type: GraphQLString,
      description: "The name of the originator of the data"
    },
    enterpriseId: {
      type: GraphQLString,
      description: "The identifier used by BEIS for identity synchronization"
    },
    firstName: {
      type: GraphQLString,
      description: "Person's first name"
    },
    middleName: {
      type: GraphQLString,
      description: "Person's middle name"
    },
    lastName: {
      type: GraphQLString,
      description: "Person's last name"
    },
    fullName: {
      type: GraphQLString,
      description: "Person's full name"
    },
    surnamePrefix: {
      type: GraphQLString,
      description: "The article or preposition portion of a person's last name"
    },
    guid: {
      type: GraphQLString,
      description: "A globally unique identifier of the person"
    },
    person: {
      description: "Person Record",
      type: PersonType,
      resolve: (root, args, context) =>
        new PersonService(context).load(root.guid)
    },
    imsSourcedId: {
      type: GraphQLString,
      description: "The Permanent, unique identifier for a person required" +
        " for IMS data transfers",
      resolve: (root, args, context) => root.imsSourcedIdBase.sourcedId
    },
    thirdPartyAccess: {
      description: "Third Party Access",
      type: new GraphQLObjectType({
        name: "ThirdPartyAccess",
        description: "Third Party Access",
        fields: () => ({
          externalUser: {
            type: GraphQLString,
            description: "The username generated by Banner for new accounts" +
              " (GOBTPAC_EXTERNAL_USER)"
          },
          ldapUserMapping: {
            type: GraphQLString,
            description: "The identifier used in GOBTPAC for mapping ldap" +
              " authentication (GOBTPAC_LDAP_USER)"
          }
        })
      })
    }
  })
});

export { PersonIdentificationType };
