import userServices from "../services/userServices.js";

async function getUsers(req, res, next) {
  try {
    res.json(await userServices.getAll());
  } catch (err) {
    console.error(`Error while getting users`);
    next(err);
  }
}



const getUser = async (req, res, next) => {
  try {
    if (!req?.params?.id) {
      throw { message: "No parameter provided" };
    }

    const response = await userServices.getUser(parseInt(req.params.id));

    if (!response) {
      throw { message: "No user found" };
    }

    res.json(response);
  } catch (err) {
    console.error(`Error while getting user`);
    next(err);
  }
};

const addUser = async (req, res, next) => {
  try {
    if (!req.body.name) {

      throw { message: "No name provided" };
    }

    const response = await userServices.addUser({
      name: req.body.name,
    });

    res.json(response);
  } catch (err) {
    console.error(`Error while adding user`);
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    if (!req?.params?.id) {
      throw { message: "No parameter provided" };
    }

    const id = parseInt(req.params.id);
    const user = await userServices.getUser(id);

    if (!user) {
      throw { message: "User not found" };
    }

    const response = await userServices.updateUser(id, {
      name: req.body.name ||user.name
  
    });

    res.json(response);
  } catch (err) {
    console.error(`Error while updating user`);
    next(err);
  }
};

const updateUser2 = async (req, res, next) => {
  try {
    if (!req?.params?.id) {
      throw { message: "No parameter provided" };
    }

    const id = parseInt(req.params.id);
    const user = await userServices.getUser(id);

    if (!user) {
      throw { message: "User not found" };
    }

    const response = await userServices.updateUser(id, {
      name: req?.body?.name,
      location: req?.body?.location,
      position: req?.body?.position,
      age: req?.body?.age
    });

    res.json(response);
  } catch (err) {
    console.error(`Error while updating user`);
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    if (!req?.params?.id) {
      throw { message: "No parameter provided" };
    }

    const response = await userServices.deleteUser(parseInt(req.params.id));
    res.json({ message: response });
  } catch (err) {
    console.error(`Error while deleting user`);
    next(err);
  }
};

export default { getUsers, getUser, deleteUser, addUser, updateUser };
