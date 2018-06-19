# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :todo_api,
  ecto_repos: [TodoApi.Repo]

# Configures the endpoint
config :todo_api, TodoApiWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "hFkjaRWGnSk0LXhDF7xoaTtzjCQfo9BXEdh3nyRcDXfQUW9cZCPDIe8RQG2G9kOZ",
  render_errors: [view: TodoApiWeb.ErrorView, accepts: ~w(json)],
  pubsub: [name: TodoApi.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:user_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
