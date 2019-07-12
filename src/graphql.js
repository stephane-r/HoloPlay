/* @flow */

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The `DateTime` scalar represents a date and time following the ISO 8601 standard */
  DateTime: any,
  JSON: any,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
  /** The `Long` scalar type represents 52-bit integers */
  Long: any
};

export type CreatePlaylistInput = {
  data?: ?PlaylistInput
};

export type CreatePlaylistPayload = {
  __typename?: 'createPlaylistPayload',
  playlist?: ?Playlist
};

export type CreateRoleInput = {
  data?: ?RoleInput
};

export type CreateRolePayload = {
  __typename?: 'createRolePayload',
  role?: ?UsersPermissionsRole
};

export type CreateUserInput = {
  data?: ?UserInput
};

export type CreateUserPayload = {
  __typename?: 'createUserPayload',
  user?: ?UsersPermissionsUser
};

export type DeletePlaylistInput = {
  where?: ?InputId
};

export type DeletePlaylistPayload = {
  __typename?: 'deletePlaylistPayload',
  playlist?: ?Playlist
};

export type DeleteRoleInput = {
  where?: ?InputId
};

export type DeleteRolePayload = {
  __typename?: 'deleteRolePayload',
  role?: ?UsersPermissionsRole
};

export type DeleteUserInput = {
  where?: ?InputId
};

export type DeleteUserPayload = {
  __typename?: 'deleteUserPayload',
  user?: ?UsersPermissionsUser
};

export type EditFileInput = {
  name?: ?$ElementType<Scalars, 'String'>,
  hash?: ?$ElementType<Scalars, 'String'>,
  sha256?: ?$ElementType<Scalars, 'String'>,
  ext?: ?$ElementType<Scalars, 'String'>,
  mime?: ?$ElementType<Scalars, 'String'>,
  size?: ?$ElementType<Scalars, 'String'>,
  url?: ?$ElementType<Scalars, 'String'>,
  provider?: ?$ElementType<Scalars, 'String'>,
  public_id?: ?$ElementType<Scalars, 'String'>,
  related?: ?Array<?$ElementType<Scalars, 'ID'>>
};

export type EditPlaylistInput = {
  name?: ?$ElementType<Scalars, 'String'>,
  userIds?: ?Array<?$ElementType<Scalars, 'ID'>>,
  sources?: ?$ElementType<Scalars, 'JSON'>
};

export type EditRoleInput = {
  name?: ?$ElementType<Scalars, 'String'>,
  description?: ?$ElementType<Scalars, 'String'>,
  type?: ?$ElementType<Scalars, 'String'>,
  permissions?: ?Array<?$ElementType<Scalars, 'ID'>>,
  users?: ?Array<?$ElementType<Scalars, 'ID'>>
};

export type EditUserInput = {
  username?: ?$ElementType<Scalars, 'String'>,
  email?: ?$ElementType<Scalars, 'String'>,
  provider?: ?$ElementType<Scalars, 'String'>,
  password?: ?$ElementType<Scalars, 'String'>,
  resetPasswordToken?: ?$ElementType<Scalars, 'String'>,
  confirmed?: ?$ElementType<Scalars, 'Boolean'>,
  blocked?: ?$ElementType<Scalars, 'Boolean'>,
  role?: ?$ElementType<Scalars, 'ID'>,
  playlist?: ?$ElementType<Scalars, 'ID'>
};

export type FileInput = {
  name: $ElementType<Scalars, 'String'>,
  hash: $ElementType<Scalars, 'String'>,
  sha256?: ?$ElementType<Scalars, 'String'>,
  ext?: ?$ElementType<Scalars, 'String'>,
  mime: $ElementType<Scalars, 'String'>,
  size: $ElementType<Scalars, 'String'>,
  url: $ElementType<Scalars, 'String'>,
  provider: $ElementType<Scalars, 'String'>,
  public_id?: ?$ElementType<Scalars, 'String'>,
  related?: ?Array<?$ElementType<Scalars, 'ID'>>
};

export type InputId = {
  id: $ElementType<Scalars, 'ID'>
};

export type Morph =
  | UsersPermissionsMe
  | UsersPermissionsMeRole
  | Playlist
  | CreatePlaylistPayload
  | UpdatePlaylistPayload
  | DeletePlaylistPayload
  | UploadFile
  | UsersPermissionsPermission
  | UsersPermissionsRole
  | CreateRolePayload
  | UpdateRolePayload
  | DeleteRolePayload
  | UsersPermissionsUser
  | CreateUserPayload
  | UpdateUserPayload
  | DeleteUserPayload;

export type Mutation = {
  __typename?: 'Mutation',
  createPlaylist?: ?CreatePlaylistPayload,
  updatePlaylist?: ?UpdatePlaylistPayload,
  deletePlaylist?: ?DeletePlaylistPayload,
  /** Create a new role */
  createRole?: ?CreateRolePayload,
  /** Update an existing role */
  updateRole?: ?UpdateRolePayload,
  /** Delete an existing role */
  deleteRole?: ?DeleteRolePayload,
  /** Create a new user */
  createUser?: ?CreateUserPayload,
  /** Update an existing user */
  updateUser?: ?UpdateUserPayload,
  /** Delete an existing user */
  deleteUser?: ?DeleteUserPayload,
  upload: UploadFile
};

export type MutationCreatePlaylistArgs = {
  input?: ?CreatePlaylistInput
};

export type MutationUpdatePlaylistArgs = {
  input?: ?UpdatePlaylistInput
};

export type MutationDeletePlaylistArgs = {
  input?: ?DeletePlaylistInput
};

export type MutationCreateRoleArgs = {
  input?: ?CreateRoleInput
};

export type MutationUpdateRoleArgs = {
  input?: ?UpdateRoleInput
};

export type MutationDeleteRoleArgs = {
  input?: ?DeleteRoleInput
};

export type MutationCreateUserArgs = {
  input?: ?CreateUserInput
};

export type MutationUpdateUserArgs = {
  input?: ?UpdateUserInput
};

export type MutationDeleteUserArgs = {
  input?: ?DeleteUserInput
};

export type MutationUploadArgs = {
  refId?: ?$ElementType<Scalars, 'ID'>,
  ref?: ?$ElementType<Scalars, 'String'>,
  source?: ?$ElementType<Scalars, 'String'>,
  file: $ElementType<Scalars, 'Upload'>
};

/** All playlist created by users */
export type Playlist = {
  __typename?: 'Playlist',
  id: $ElementType<Scalars, 'ID'>,
  created_at: $ElementType<Scalars, 'DateTime'>,
  updated_at: $ElementType<Scalars, 'DateTime'>,
  name: $ElementType<Scalars, 'String'>,
  sources?: ?$ElementType<Scalars, 'JSON'>,
  userIds?: ?Array<?UsersPermissionsUser>
};

/** All playlist created by users */
export type PlaylistUserIdsArgs = {
  sort?: ?$ElementType<Scalars, 'String'>,
  limit?: ?$ElementType<Scalars, 'Int'>,
  start?: ?$ElementType<Scalars, 'Int'>,
  where?: ?$ElementType<Scalars, 'JSON'>
};

export type PlaylistInput = {
  name: $ElementType<Scalars, 'String'>,
  userIds?: ?Array<?$ElementType<Scalars, 'ID'>>,
  sources?: ?$ElementType<Scalars, 'JSON'>
};

export type Query = {
  __typename?: 'Query',
  playlist?: ?Playlist,
  playlists?: ?Array<?Playlist>,
  files?: ?Array<?UploadFile>,
  role?: ?UsersPermissionsRole,
  /** Retrieve all the existing roles. You can't apply filters on this query. */
  roles?: ?Array<?UsersPermissionsRole>,
  user?: ?UsersPermissionsUser,
  users?: ?Array<?UsersPermissionsUser>,
  me?: ?UsersPermissionsMe
};

export type QueryPlaylistArgs = {
  id: $ElementType<Scalars, 'ID'>
};

export type QueryPlaylistsArgs = {
  sort?: ?$ElementType<Scalars, 'String'>,
  limit?: ?$ElementType<Scalars, 'Int'>,
  start?: ?$ElementType<Scalars, 'Int'>,
  where?: ?$ElementType<Scalars, 'JSON'>
};

export type QueryFilesArgs = {
  sort?: ?$ElementType<Scalars, 'String'>,
  limit?: ?$ElementType<Scalars, 'Int'>,
  start?: ?$ElementType<Scalars, 'Int'>,
  where?: ?$ElementType<Scalars, 'JSON'>
};

export type QueryRoleArgs = {
  id: $ElementType<Scalars, 'ID'>
};

export type QueryRolesArgs = {
  sort?: ?$ElementType<Scalars, 'String'>,
  limit?: ?$ElementType<Scalars, 'Int'>,
  start?: ?$ElementType<Scalars, 'Int'>,
  where?: ?$ElementType<Scalars, 'JSON'>
};

export type QueryUserArgs = {
  id: $ElementType<Scalars, 'ID'>
};

export type QueryUsersArgs = {
  sort?: ?$ElementType<Scalars, 'String'>,
  limit?: ?$ElementType<Scalars, 'Int'>,
  start?: ?$ElementType<Scalars, 'Int'>,
  where?: ?$ElementType<Scalars, 'JSON'>
};

export type RoleInput = {
  name: $ElementType<Scalars, 'String'>,
  description?: ?$ElementType<Scalars, 'String'>,
  type?: ?$ElementType<Scalars, 'String'>,
  permissions?: ?Array<?$ElementType<Scalars, 'ID'>>,
  users?: ?Array<?$ElementType<Scalars, 'ID'>>
};

export type UpdatePlaylistInput = {
  where?: ?InputId,
  data?: ?EditPlaylistInput
};

export type UpdatePlaylistPayload = {
  __typename?: 'updatePlaylistPayload',
  playlist?: ?Playlist
};

export type UpdateRoleInput = {
  where?: ?InputId,
  data?: ?EditRoleInput
};

export type UpdateRolePayload = {
  __typename?: 'updateRolePayload',
  role?: ?UsersPermissionsRole
};

export type UpdateUserInput = {
  where?: ?InputId,
  data?: ?EditUserInput
};

export type UpdateUserPayload = {
  __typename?: 'updateUserPayload',
  user?: ?UsersPermissionsUser
};

export type UploadFile = {
  __typename?: 'UploadFile',
  id: $ElementType<Scalars, 'ID'>,
  created_at: $ElementType<Scalars, 'DateTime'>,
  updated_at: $ElementType<Scalars, 'DateTime'>,
  name: $ElementType<Scalars, 'String'>,
  hash: $ElementType<Scalars, 'String'>,
  sha256?: ?$ElementType<Scalars, 'String'>,
  ext?: ?$ElementType<Scalars, 'String'>,
  mime: $ElementType<Scalars, 'String'>,
  size: $ElementType<Scalars, 'String'>,
  url: $ElementType<Scalars, 'String'>,
  provider: $ElementType<Scalars, 'String'>,
  public_id?: ?$ElementType<Scalars, 'String'>,
  related?: ?Array<?Morph>
};

export type UploadFileRelatedArgs = {
  sort?: ?$ElementType<Scalars, 'String'>,
  limit?: ?$ElementType<Scalars, 'Int'>,
  start?: ?$ElementType<Scalars, 'Int'>,
  where?: ?$ElementType<Scalars, 'JSON'>
};

export type UserInput = {
  username: $ElementType<Scalars, 'String'>,
  email: $ElementType<Scalars, 'String'>,
  provider?: ?$ElementType<Scalars, 'String'>,
  password?: ?$ElementType<Scalars, 'String'>,
  resetPasswordToken?: ?$ElementType<Scalars, 'String'>,
  confirmed?: ?$ElementType<Scalars, 'Boolean'>,
  blocked?: ?$ElementType<Scalars, 'Boolean'>,
  role?: ?$ElementType<Scalars, 'ID'>,
  playlist?: ?$ElementType<Scalars, 'ID'>
};

export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe',
  _id: $ElementType<Scalars, 'ID'>,
  username: $ElementType<Scalars, 'String'>,
  email: $ElementType<Scalars, 'String'>,
  confirmed?: ?$ElementType<Scalars, 'Boolean'>,
  blocked?: ?$ElementType<Scalars, 'Boolean'>,
  role?: ?UsersPermissionsMeRole
};

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole',
  _id: $ElementType<Scalars, 'ID'>,
  name: $ElementType<Scalars, 'String'>,
  description?: ?$ElementType<Scalars, 'String'>,
  type?: ?$ElementType<Scalars, 'String'>
};

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission',
  id: $ElementType<Scalars, 'ID'>,
  type: $ElementType<Scalars, 'String'>,
  controller: $ElementType<Scalars, 'String'>,
  action: $ElementType<Scalars, 'String'>,
  enabled: $ElementType<Scalars, 'Boolean'>,
  policy?: ?$ElementType<Scalars, 'String'>,
  role?: ?UsersPermissionsRole
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole',
  id: $ElementType<Scalars, 'ID'>,
  name: $ElementType<Scalars, 'String'>,
  description?: ?$ElementType<Scalars, 'String'>,
  type?: ?$ElementType<Scalars, 'String'>,
  permissions?: ?Array<?UsersPermissionsPermission>,
  users?: ?Array<?UsersPermissionsUser>
};

export type UsersPermissionsRolePermissionsArgs = {
  sort?: ?$ElementType<Scalars, 'String'>,
  limit?: ?$ElementType<Scalars, 'Int'>,
  start?: ?$ElementType<Scalars, 'Int'>,
  where?: ?$ElementType<Scalars, 'JSON'>
};

export type UsersPermissionsRoleUsersArgs = {
  sort?: ?$ElementType<Scalars, 'String'>,
  limit?: ?$ElementType<Scalars, 'Int'>,
  start?: ?$ElementType<Scalars, 'Int'>,
  where?: ?$ElementType<Scalars, 'JSON'>
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser',
  id: $ElementType<Scalars, 'ID'>,
  created_at: $ElementType<Scalars, 'DateTime'>,
  updated_at: $ElementType<Scalars, 'DateTime'>,
  username: $ElementType<Scalars, 'String'>,
  email: $ElementType<Scalars, 'String'>,
  provider?: ?$ElementType<Scalars, 'String'>,
  confirmed?: ?$ElementType<Scalars, 'Boolean'>,
  blocked?: ?$ElementType<Scalars, 'Boolean'>,
  role?: ?UsersPermissionsRole,
  playlist?: ?Playlist
};
