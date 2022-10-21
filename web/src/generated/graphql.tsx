import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createReport: ReportResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
};


export type MutationCreateReportArgs = {
  options: ReportInput;
};


export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  report?: Maybe<Report>;
  reports: Array<Report>;
};


export type QueryReportArgs = {
  _id: Scalars['String'];
};

export type Report = {
  __typename?: 'Report';
  _id: Scalars['String'];
  createdAt: Scalars['String'];
  description: Scalars['String'];
  injured: Scalars['Boolean'];
  recom: Scalars['String'];
  title: Scalars['String'];
};

export type ReportFieldError = {
  __typename?: 'ReportFieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type ReportInput = {
  description: Scalars['String'];
  injured: Scalars['Boolean'];
  recom: Scalars['String'];
  title: Scalars['String'];
};

export type ReportResponse = {
  __typename?: 'ReportResponse';
  errors?: Maybe<Array<ReportFieldError>>;
  report?: Maybe<Report>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type RegularReportFragment = { __typename?: 'Report', _id: string, createdAt: string, title: string, description: string, recom: string, injured: boolean };

export type RegularUserFragment = { __typename?: 'User', _id: string, username: string };

export type LoginMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', _id: string, username: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', _id: string, username: string } | null } };

export type CreateReportMutationVariables = Exact<{
  options: ReportInput;
}>;


export type CreateReportMutation = { __typename?: 'Mutation', createReport: { __typename?: 'ReportResponse', errors?: Array<{ __typename?: 'ReportFieldError', field: string, message: string }> | null, report?: { __typename?: 'Report', _id: string, createdAt: string, title: string, description: string, recom: string, injured: boolean } | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', _id: string, username: string } | null };

export type ReportQueryVariables = Exact<{
  opt: Scalars['String'];
}>;


export type ReportQuery = { __typename?: 'Query', report?: { __typename?: 'Report', _id: string, createdAt: string, title: string, description: string, recom: string, injured: boolean } | null };

export type ReportsQueryVariables = Exact<{ [key: string]: never; }>;


export type ReportsQuery = { __typename?: 'Query', reports: Array<{ __typename?: 'Report', _id: string, createdAt: string, title: string, injured: boolean }> };

export const RegularReportFragmentDoc = gql`
    fragment RegularReport on Report {
  _id
  createdAt
  title
  description
  recom
  injured
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  _id
  username
}
    `;
export const LoginDocument = gql`
    mutation login($options: UsernamePasswordInput!) {
  login(options: $options) {
    errors {
      field
      message
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    errors {
      field
      message
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const CreateReportDocument = gql`
    mutation CreateReport($options: ReportInput!) {
  createReport(options: $options) {
    errors {
      field
      message
    }
    report {
      ...RegularReport
    }
  }
}
    ${RegularReportFragmentDoc}`;

export function useCreateReportMutation() {
  return Urql.useMutation<CreateReportMutation, CreateReportMutationVariables>(CreateReportDocument);
};
export const MeDocument = gql`
    query me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};
export const ReportDocument = gql`
    query Report($opt: String!) {
  report(_id: $opt) {
    ...RegularReport
  }
}
    ${RegularReportFragmentDoc}`;

export function useReportQuery(options: Omit<Urql.UseQueryArgs<ReportQueryVariables>, 'query'>) {
  return Urql.useQuery<ReportQuery, ReportQueryVariables>({ query: ReportDocument, ...options });
};
export const ReportsDocument = gql`
    query Reports {
  reports {
    _id
    createdAt
    title
    injured
  }
}
    `;

export function useReportsQuery(options?: Omit<Urql.UseQueryArgs<ReportsQueryVariables>, 'query'>) {
  return Urql.useQuery<ReportsQuery, ReportsQueryVariables>({ query: ReportsDocument, ...options });
};