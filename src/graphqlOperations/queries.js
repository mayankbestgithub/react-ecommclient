import { gql } from "@apollo/client"


export const GET_PRODUCTS = gql`
query Products_connection($pagination: PaginationArg) {
  products_connection(pagination: $pagination) {
    nodes {
      documentId
      name
      description
      price
      image {
        url
      }
      category {
        name
      }
    }
    pageInfo {
      pageCount
    }
  }
}
`;
export const GET_PRODUCT = gql`
query Product($documentId: ID!) {
  product(documentId: $documentId) {
    name
    description
    price
    image {
      url
    }
  }
}
`
export const GET_CATEGORIES = gql`
query Categories {
categories {
documentId
name
}
}
`
export const GET_CATEGORY = gql`
query Category($documentId: ID!) {
  category(documentId: $documentId) {
    products {
     documentId
      name
      price
      description
      image {
        url
      }
    }
  }
}


`
export const GET_PRODUCT_BY_NAME = gql`
query getProduct($filters: ProductFiltersInput) {
  products(filters: $filters) {
    documentId
    description
    category {
      name
    }
    name
    price
    image {
      url
    }
  }
}
`