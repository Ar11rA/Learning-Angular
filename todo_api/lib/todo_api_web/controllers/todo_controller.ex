defmodule TodoApiWeb.TodoController do
  use TodoApiWeb, :controller

  alias TodoApi.App
  alias TodoApi.App.Todo

  action_fallback TodoApiWeb.FallbackController

  def index(conn, _params) do
    todos = App.list_todos()
    render(conn, "index.json", todos: todos)
  end

  def create(conn, todo_params) do
    with {:ok, %Todo{} = todo} <- App.create_todo(todo_params) do
      conn
      |> put_status(:created)
      |> render("show.json", todo: todo)
    end
  end

  def show(conn, %{"id" => id}) do
    todo = App.get_todo!(id)
    render(conn, "show.json", todo: todo)
  end

  def update(conn, %{"id" => id, "todo" => todo_params}) do
    todo = App.get_todo!(id)

    with {:ok, %Todo{} = todo} <- App.update_todo(todo, todo_params) do
      render(conn, "show.json", todo: todo)
    end
  end

  def delete(conn, %{"id" => id}) do
    todo = App.get_todo!(id)
    with {:ok, %Todo{}} <- App.delete_todo(todo) do
      send_resp(conn, :no_content, "")
    end
  end
end
