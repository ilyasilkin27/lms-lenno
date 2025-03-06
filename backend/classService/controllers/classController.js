import supabase from "../db/supabase.js";

const createClass = async (name) => {
  const { data, error } = await supabase
    .from("classes")
    .insert([{ name }])
    .select();

  if (error) throw new Error(error.message);
  return data[0];
};

const getAllClasses = async () => {
  const { data, error } = await supabase.from("classes").select("*");
  if (error) throw new Error(error.message);
  return data;
};

const getClassById = async (id) => {
  const { data, error } = await supabase
    .from("classes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

const updateClass = async (id, name) => {
  const { data, error } = await supabase
    .from("classes")
    .update({ name })
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data[0];
};

const deleteClass = async (id) => {
  const { error } = await supabase.from("classes").delete().eq("id", id);

  if (error) throw new Error(error.message);
};

export default {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
}; 